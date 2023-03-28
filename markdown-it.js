const md = require('markdown-it')();
const fs = require('fs');

const DIR_NAME_IN = './docs';
const DIR_NAME_OUT = './_docs';

const fileNames = fs.readdirSync(DIR_NAME_IN, {});

const resultFileArr = fileNames.map((fileName) => {
    const generationNmbr = fileName.charAt(0);
    if (Number.isInteger(+generationNmbr) && fileName.endsWith('.md')) {
        const data = fs.readFileSync(`${DIR_NAME_IN}/${fileName}`);
        const dataStr = data.toString()
            .replace(/<br>/g, ' ');

        const result = md.render(dataStr);

        return result
            .replace('<p', `<p id="${fileName.replace('.md', '')}"`)
            .replace(/\/ancestors\//g, '#');
    } else {
        return '';
    }
});

const resultFileStr = `
<!DOCTYPE html>
<html>
<head>
  <style>
    /*! ADAPTED
  Typeplate : Starter Kit
  URL ........... http://typeplate.com
  Version ....... 3.0.2
  Github ........ https://github.com/typeplate/starter-kit
  Authors ....... Dennis Gaebel (@gryghostvisuals) & Zachary Kain (@zakkain)
  License ....... Creative Commmons Attribution 3.0
  License URL ... https://github.com/typeplate/starter-kit/blob/master/license.txt
  */

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      text-rendering: optimizeLegibility;
      line-height: 1;
      margin-top: 0;
      color: #222;
    }

    blockquote + figcaption cite {
      display: block;
      font-size: inherit;
      text-align: right;
    }

    body {
      word-wrap: break-word;
    }

    pre code {
      word-wrap: normal;
    }

    body {
      -webkit-hyphens: auto;
      -ms-hyphens: auto;
      hyphens: auto;
      color: #444;
    }

    h1 {
      font-size: 2em;
      /* 2*16 = 32 */
    }

    h2 {
      font-size: 1.5em;
      /* 1.5*16 = 24 */
    }

    h3 {
      font-size: 1.17em;
      /* 1.17*16 = 18.72 */
    }

    h4 {
      font-size: 1em;
      /* 1*16 = 16 */
    }

    h5 {
      font-size: 0.83em;
      /* 0.83*16 = 13.28 */
    }

    h6 {
      font-size: 0.75em;
      /* 0.75*16 = 12 */
    }

    h1 {
      margin: 2.42424rem 0 1.454544rem;
    }

    h2 {
      margin: 2.0202rem 0 1.21212rem;
    }

    h3 {
      margin: 1.61616rem 0 1rem;
    }

    h4 {
      margin: 1.21212rem 0 1;
    }

    h5 {
      margin: 0.80808rem 0;
    }

    h6 {
      margin: 0.70707rem 0;
    }

    p {
      margin: auto auto 1.5rem;
    }

    small {
      font-size: 65%;
    }

    input,
    abbr,
    acronym,
    blockquote,
    code,
    kbd,
    q,
    samp,
    var {
      -webkit-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
    }

    pre {
      white-space: pre;
    }

    pre code {
      white-space: -moz-pre-wrap;
      white-space: pre-wrap;
    }

    code {
      white-space: pre;
      font-family: SF Mono, Consolas, Dejavu Sans Mono, Menlo, monospace;
    }

    abbr {
      -webkit-font-variant: small-caps;
      -moz-font-variant: small-caps;
      -ms-font-variant: small-caps;
      font-variant: small-caps;
      font-weight: 600;
      text-transform: lowercase;
      color: gray;
    }

    abbr[title]:hover {
      cursor: help;
    }

    /* FROM http://purecss.io/layouts/side-menu/  adapted to remove pure classes*/

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
      color: #444;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: auto;
    }

    code,
    pre {
      background-color: #f5f5f5;
      color: #444;
      border-radius: 2px;
      text-shadow: 0px 1px 0px white;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    }

    pre code {
      border: none;
      box-shadow: none;
    }

    pre {
      padding: 0.5em;
    }

    code {
      display: inline-block;
      padding: 0 0.5em;
      line-height: 1.4;
      font-size: 0.9em;
    }

    table {
      border-spacing: 0;
      margin-bottom: 1.5rem;
    }

    table th,
    table td {
      padding: 0.3em 0.7em;
    }

    table th {
      background-color: #f4f4f4;
      border-bottom: 2px solid #444;
    }

    table td {
      border: 1px solid #f5f5f5;
    }

    /* Add transition to containers so they can push in and out. */

    #layout,
    #menu,
    .menu-link {
      -webkit-transition: all 0.2s ease-out;
      -moz-transition: all 0.2s ease-out;
      -ms-transition: all 0.2s ease-out;
      -o-transition: all 0.2s ease-out;
      transition: all 0.2s ease-out;
    }

    /* This is the parent \`<div>\` that contains the menu and the content area. */

    #layout {
      position: relative;
      padding-left: 0;
    }

    #layout.active #menu {
      left: 250px;
      width: 250px;
    }

    #layout.active .menu-link {
      left: 250px;
    }

    /* The content \`<div>\` is where all your content goes. */

    .content {
      margin: 50px auto;
      padding: 0 2em;
      max-width: 130ex;
      line-height: 1.6em;
      border-bottom: 2px solid;
    }

    /*
    The \`#menu\` \`<div>\` is the parent \`<div>\` that contains the menu that
    appears on the left side of the page.
    */

    #menu {
      margin-left: -250px;
      /* "#menu" width */
      width: 250px;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 1000;
      /* so the menu or its navicon stays above all content */
      background: #f4f4f4;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      font-size: 0.9em;
    }

    @media print {
      #menu,
      .menu-link {
        display: none !important;
      }
    }

    a,
    a * {
      text-decoration: none;
      color: #2483cc;
    }

    a:visited {
      text-decoration: none;
      color: #2483cc;
    }

    /* All anchors inside the menu should be styled like this. */

    #menu a {
      display: block;
      padding: 0.5em 0.5em;
    }

    #menu a:first-letter {
      text-transform: capitalize;
    }

    #menu ul {
      list-style-type: none;
      padding: 0;
      margin: 1em 0.5em;
    }

    #menu ul ul {
      margin-top: 0.5em;
      margin-left: 0.5em;
      border-left: 4px solid rgba(255, 255, 255, 0.5);
    }

    /* Change color of the anchor links on hover/focus. */

    #menu li a:hover,
    #menu li a:focus {
      background: rgba(255, 255, 255, 0.4);
    }

    /* This styles the selected menu item \`<li>\`. */

    #menu li a.active {
      background: rgba(0, 0, 0, 0.05);
    }

    /* This styles a link within a selected menu item \`<li>\`. */

    #menu li a.active {
      color: #222;
    }

    /* This styles the menu heading. */

    #menu li.heading {
      font-size: 0.9em;
      text-transform: uppercase;
      color: #000;
    }

    #menu li.heading > * {
      padding: 0.5em;
      display: block;
    }

    #menu li.heading a {
      color: #0c68af;
    }

    /* -- Dynamic Button For Responsive Menu -------------------------------------*/

    /*
    \`.menu-link\` represents the responsive menu toggle that shows/hides on
    small screens.
    */

    .menu-link {
      position: fixed;
      display: block;
      /* show this only on small screens */
      top: 0;
      left: 0;
      /* "#menu width" */
      font-size: 10px;
      /* change this value to increase/decrease button size */
      z-index: 10;
      width: 2em;
      height: auto;
      padding: 1.6em 1.2em;
      border-radius: 0 2px 2px 0;
    }

    .menu-link:hover {
      background: #f4f4f4;
    }

    .menu-link span {
      position: relative;
      display: block;
    }

    .menu-link span,
    .menu-link span:before,
    .menu-link span:after {
      background-color: #555;
      width: 100%;
      height: 0.2em;
      border-radius: 1em;
    }

    .menu-link span:before,
    .menu-link span:after {
      position: absolute;
      margin-top: -0.6em;
      content: " ";
    }

    .menu-link span:after {
      margin-top: 0.6em;
    }

    /* Hides the menu at \`48em\`, but modify this based on your app's needs. */

    @media (min-width: 48em) {
      .header,
      .content {
        padding-left: 2em;
        padding-right: 2em;
      }

      #layout {
        padding-left: 250px;
        /* left col width "#menu" */
        left: 0;
      }
      #menu {
        left: 250px;
      }

      .menu-link {
        position: fixed;
        left: 250px;
        display: none;
      }

      #layout.active .menu-link {
        left: 250px;
      }
    }

    @media (max-width: 48em) {
      /* Only apply this when the window is small. Otherwise, the following case results in extra padding on the left:
       * Make the window small.
       * Tap the menu to trigger the active state.
       * Make the window large again.
       */
      #layout.active {
        position: relative;
        left: 250px;
      }
    }

    /* Heading anchors and permalinks */
    h1[id],
    h2[id],
    h3[id],
    h4[id],
    h5[id],
    h6[id] {
      position: relative;
    }
    .heading-anchor-permalink {
      /* Position the permalink to the left of the title */
      position: absolute;
      right: 100%;
      /* Add some spacing as padding to not lose the hover */
      padding-right: 0.6rem;
      /* Make it only visible on heading hover, see below */
      opacity: 0;
    }
    h1[id]:hover .heading-anchor-permalink,
    h2[id]:hover .heading-anchor-permalink,
    h3[id]:hover .heading-anchor-permalink,
    h4[id]:hover .heading-anchor-permalink,
    h5[id]:hover .heading-anchor-permalink,
    h6[id]:hover .heading-anchor-permalink {
      opacity: 0.5;
    }
    @media print {
  html, body {
    background: none !important;
    color: #000 !important;
    font-size: 10pt !important;
  }
  .header-social-link,
  .main-navigation,
  .widget,
  .comments-area .comment-edit-link,
  .comments-area .reply,
  .comment-respond,
  .navigation,
  #infinite-handle,
  .sidebar-area,
  .footer-widget-wrapper {
    display: none !important;
  }
  .site-content {
    max-width: none;
  }
  #toTopBtn, #page {
    display: none;
  }
  .site-bottom,
  .site-bottom a {
    color: #000;
  }
  article {
    //page-break-after: always;
    page-break-inside: avoid;
  }
}
  </style>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charset="utf-8" />
</head>
<body>
${resultFileArr.map((person) => person ? `<article class="content">${person}</article>` : '').join('')}
</body>
</html>
`.trim();

fs.writeFileSync(`${DIR_NAME_OUT}/all.html`, resultFileStr);