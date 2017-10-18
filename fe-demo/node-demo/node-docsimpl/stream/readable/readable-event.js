var fs = require('fs');
var stream = require('stream');

/*var rr = fs.createReadStream('./file.txt');

rr.setEncoding('utf-8');

rr.on('data',(chunk) => {
    console.log(chunk);
});

rr.on('readable', () =>{
    console.log('stream is readable');
});

rr.on('end',() => {
    console.log('stream is ended');
});*/


var rr = fs.createReadStream("./file.txt");

rr.on('readable',() => {
    console.log("readable:" + rr.read());
});

rr.on('end',() => {
    console.log("end");
});