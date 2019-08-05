var postcss = require('postcss');
var px2rem = require('postcss-px2rem');
var fs = require('fs');
var path = require('path');

var originCssText = fs.readFileSync(path.resolve(__dirname,'./mint/style.css'),'utf-8');

var newCssText = postcss().use(px2rem({remUnit: 50})).process(originCssText).css;

fs.writeFileSync(path.resolve(__dirname,'./mint/mint-rem.css'),newCssText,'utf-8')
