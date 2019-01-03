var EventEmitter = require('events');
var util = require('util');
var process = require('process');

function MyEmitter(){
    EventEmitter.call(this);
}
util.inherits(MyEmitter,EventEmitter);

var myEmitter = new MyEmitter();

process.on('uncaughtException',(err) => {
    console.log('whoops! there was an error');
});

myEmitter.on('error', (err) => {
    console.log('error happened');
});

myEmitter.emit('error',new Error('whoops'));