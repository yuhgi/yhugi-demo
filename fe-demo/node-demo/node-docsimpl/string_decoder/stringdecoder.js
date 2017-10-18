const StringDecoder = require('string_decoder').StringDecoder;

const decoder = new StringDecoder("utf-8");

const cent = new Buffer([69,66]);
console.log(decoder.write(cent));

const euro = new Buffer([0xE2,0x82,0xAC]);
console.log(decoder.write(euro));

console.log(cent);