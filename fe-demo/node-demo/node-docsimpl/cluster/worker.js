const cluster = require('cluster');
const http = require('http');
const worker = cluster.worker;
worker.on('message',(message,handle) => {
    console.log(`worker:${worker.id}接收到消息 - ${message}`);
});

http.createServer((req,res) => {
    res.writeHead(200);
    res.end(`Hello World,pid:${process.pid}`);
}).listen(8000);

console.log(`工作进程 ${process.pid} 已启动`);
const random = Math.random() * 100000;

setTimeout(() => {
    console.log(`工作进程 ${process.pid}, workerid:${worker.id} 准备退出`);
    worker.disconnect();
}, random);