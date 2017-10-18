const os = require('os');

console.log(new Buffer(os.EOL));
console.log(os.arch());
console.log(os.cpus());
console.log(os.endianness());
console.log(os.freemem());
console.log(os.homedir());