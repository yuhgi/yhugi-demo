"use strict";
const querystring = require('querystring');

console.log(querystring.parse('foo=bar&baz=qux&baz=quux&corge'));

let obj = {
    name:'张三',
    age:21,
    sex:'男'
};

let str = querystring.stringify(obj);
console.log(str);

console.log(querystring.parse(str));
