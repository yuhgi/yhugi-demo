var EventEmitter = require('events');
var util = require('util');

function MyEmitter(){
    EventEmitter.call(this);
}
util.inherits(MyEmitter,EventEmitter);
MyEmitter.prototype.doStuff = function(){
    console.log('before');
    this.emit('event');
    console.log('after');
};

var myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    console.log('emit fired');
});

myEmitter.on('event', () => {
    console.log('emit fired2');
    setImmediate(() => {
        console.log('this happens asynchronous');
    });
});

myEmitter.doStuff();