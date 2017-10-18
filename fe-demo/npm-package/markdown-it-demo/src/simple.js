var MarkdownIt = require('markdown-it');
// var md = new MarkdownIt();
// var md = new MarkdownIt('commonmark');

// var md = new MarkdownIt({
//     html: true,
//     linkify: true,
//     typographer: true
// });

var md = new MarkdownIt({
    html:true,
    xhtmlOut:true
});
console.log(md.render('# markdown-it rullzz!'));

console.log(md.renderInline('__markdown-it__ rulezz!'));

console.log(md.render('`<div>hello</div>`'));