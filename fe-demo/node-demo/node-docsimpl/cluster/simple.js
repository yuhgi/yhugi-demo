const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

// console.log(numCPUs);
// console.log(cluster.schedulingPolicy); // 设置NODE_CLUSTER_SCHED_POLICY = 'rr' 或者'none'
// console.log(cluster.SCHED_RR); // 2
// console.log(cluster.SCHED_NONE); // 1

if(cluster.isMaster){
    console.log(`主进程 ${process.pid} 正在运行`);

    for(let i=0;i<numCPUs;i++){
        const worker = cluster.fork();
        console.log(`主进程发送消息给worker:${worker.id}`);
        worker.send(`hello,worker:${worker.id}`);
    }

    cluster.on('exit',(worker,code,signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出,code:${code},signal:${signal}`);
        cluster.fork();
    });
}else {
    http.createServer((req,res) => {
        res.writeHead(200);
        res.end(`Hello World,pid:${process.pid}`);
    }).listen(8000);

    console.log(`工作进程 ${process.pid} 已启动`);
    const random = Math.random() * 100000;
    const worker = cluster.worker;
    worker.on('message',(message,handle) => {
        console.log(`worker:${worker.id}接收到消息 - ${message}`);
    });
    setTimeout(() => {
        console.log(`工作进程 ${process.pid}, workerid:${worker.id} 准备退出`);
        worker.disconnect();
    }, random);
}