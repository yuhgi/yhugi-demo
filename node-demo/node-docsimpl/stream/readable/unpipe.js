var fs = require('fs');
var stream = require('stream');

var readable = fs.createReadStream("./file.txt");
var writable = fs.createWriteStream("./temp.txt");

readable.pipe(writable);

setTimeout(() => {
    console.log("stop writing to temp.txt");
    readable.unpipe(writable);
    console.log("manually close the file stream");
    writable.end();

    /*readable.on("readable",() => {
        var chunk;
        while(null !== (chunk = readable.read())){
            console.log("read %d bytes",chunk.length);
        }
    });*/



    readable.on('data',(chunk) => {
        console.log("read %d bytes",chunk.length);
    });
    readable.resume();
},5);