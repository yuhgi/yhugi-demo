const EventEmitter = require('events');

const myEE = new EventEmitter();

myEE.on('foo',() => {});
myEE.on('bar',() => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());