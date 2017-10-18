var fs = require("fs");
var stream = require("stream");

var readable = fs.createReadStream("./empty.txt");

readable.setEncoding("utf-8");

console.log(readable.read(12));

readable.on("readable",() => {
    var chunk;
    console.log(readable.read(12));
    /*while(null !== (chunk = readable.read())){
        console.log("got %d bytes of data",chunk.length);
        //console.log(chunk);
    }*/
});