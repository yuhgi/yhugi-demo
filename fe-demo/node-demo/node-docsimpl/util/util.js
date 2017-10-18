var util = require('util');

util.log("timestamped message");

var debuglog = util.debuglog('foo');

var bar = 123;
debuglog('hello from foo [%d]',bar);

console.log(util.format('%s:%s','foo'));

console.log(util.format('%s:%s','foo','bar','baz'));

console.log(util.format(1,2,3));

console.log(util.format({a:1},{b:2},3))

console.log(util.inspect(util,{showHidden:true,depth:1,colors:true}));

var obj = {name:'nate'};

obj.inspect = function(depth){
    return `{${this.name}}`;
};

console.log(util.inspect(obj));

const EventEmitter = require('events');

function MyStream(){
    EventEmitter.call(this);
}

util.inherits(MyStream,EventEmitter);
MyStream.prototype.write = function(data){
    this.emit('data',data);
};

var stream = new MyStream();

console.log(stream instanceof EventEmitter);
console.log(MyStream.super_ === EventEmitter);

stream.on('data',(data) => {
    console.log(`Received data : "${data}"`);
});

stream.write('It works');

console.log(util.inspect(MyStream,{depth:null}));