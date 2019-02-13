var EventEmitter = require('events');
var util = require('util');

var MyEmitter = function(){
    EventEmitter.call(this);
}
util.inherits(MyEmitter,EventEmitter);

const myEmitter = new MyEmitter();

myEmitter.once('newListener', (eventName,listener) => {
    if(eventName === 'event'){
        myEmitter.on('event',() => {
            console.log('b');
        });
    }
});

myEmitter.on('event' , () => {
    console.log('a');
});

myEmitter.emit('event');