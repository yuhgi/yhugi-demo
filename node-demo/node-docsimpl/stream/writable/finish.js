var fs = require('fs');

var writer = fs.createWriteStream("./tmp.txt");

for(var i=0;i<100;i++){
    writer.write(`hello,#${i}!\n`);
}

writer.end('this is the end\n');

writer.on('finish',() => {
    console.error('all writes are now complete');
});