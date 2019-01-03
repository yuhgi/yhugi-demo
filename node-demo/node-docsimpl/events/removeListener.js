var EventEmitter = require('events');

const myEmitter = new EventEmitter();
var callbackA = () => {
    console.log('A');
    myEmitter.removeListener('event',callbackB);
};

var callbackB = () => {
    console.log('B');
};


myEmitter.on('event',callbackA);
myEmitter.on('event',callbackB);

var listeners1 = myEmitter.listeners('event');
var listeners2 = myEmitter.listeners('event');
console.log(listeners1 === listeners2);
console.log(myEmitter.listenerCount('event'))

myEmitter.emit('event');

listeners2 = myEmitter.listeners('event');
console.log(listeners1 === listeners2);
console.log(listeners1.length);
console.log(myEmitter.listenerCount('event'))

myEmitter.emit('event');