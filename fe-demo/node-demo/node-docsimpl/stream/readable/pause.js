var stream = require('stream');
var fs = require('fs');

var readable = fs.createReadStream("./file.txt");

readable.on('data',(chunk) => {
    console.log('got %d bytes of data',chunk.length);
    readable.pause();
    console.log('there will be no more data for 2 second');
    setTimeout(() => {
        console.log('now data will start flowing again');
        readable.resume();
    },2000);
});
