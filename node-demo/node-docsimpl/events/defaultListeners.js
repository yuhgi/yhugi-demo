'use strict';
var EventEmitter = require('events');

class MyEmitter extends EventEmitter{}

var myEmitter = new MyEmitter();
myEmitter.setMaxListeners(1);

myEmitter.on('event',() => {
    console.log('event 1');
    myEmitter.setMaxListeners(myEmitter.getMaxListeners() +1);
});

myEmitter.on('event',() => {
    console.log('event 2');
});

myEmitter.emit('event');