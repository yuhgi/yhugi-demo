var EventEmitter = require('events');
var util = require('util');

var MyEE = new EventEmitter();

var a = function(){}

MyEE.on('event', a);

console.log(util.inspect(MyEE.listeners('event')));

console.log(a === MyEE.listeners('event')[0]);