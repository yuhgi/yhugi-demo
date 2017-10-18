'use strict';
const path = require('path');
const md = require('markdown-it')();
const fs = require('fs');

let filePath = path.join(__dirname,'./button.md');
fs.watchFile(filePath,(curr,prev) => {
    let mdStr = fs.readFile(filePath,'utf-8',(err,data) => {
        debugger
        let mdData = md.render(data);
        console.log(mdData);
    });
});