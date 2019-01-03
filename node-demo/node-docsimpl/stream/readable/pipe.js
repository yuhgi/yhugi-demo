var fs = require('fs');
var stream = require('stream');
var zlib = require('zlib');

var readable = fs.createReadStream("./file.txt");
var gzip = zlib.createGzip();
var writable = fs.createWriteStream("./file.txt.gz");

readable.pipe(gzip).pipe(writable);
