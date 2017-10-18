var fs = require('fs');
var stream = require('stream');

var rr = fs.createReadStream('./file.txt');

rr.setEncoding('utf-8');

rr.on('data',(chunk) => {
    console.log(chunk,'length : '+chunk.length);
});

rr.on('end',() => {
    console.log('there will be no more data');
});