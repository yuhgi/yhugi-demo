'use strict';
const EventEmitter = require('events');
const util = require('util');

/*function MyEmitter(){
    EventEmitter.call(this);
}

util.inherits(MyEmitter,EventEmitter);*/

class MyEmitter extends EventEmitter{}

const myEmitter = new MyEmitter();

myEmitter.on('event', function(msg){
    console.log('hello %s',msg,this);
    console.log(this === myEmitter);
});

myEmitter.on('event', (msg) => {
    console.log('hello %s',msg,this);
    console.log(util.inspect(this));
});

myEmitter.emit('event','world');