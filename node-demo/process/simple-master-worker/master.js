var fork = require('child_process').fork;
var cpus = require('os').cpus();
var path = require('path');

for(let i =0;i<cpus.length;i++){
    fork(path.resolve(__dirname,'./worker.js'));
}