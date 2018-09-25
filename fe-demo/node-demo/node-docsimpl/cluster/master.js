const cluster = require('cluster');
const path = require('path');

const numCPUs = require('os').cpus().length;

cluster.setupMaster({
    exec: path.resolve(__dirname,'./worker.js')
});

console.log(`主进程 ${process.pid} 正在运行`);

for (let i = 0; i < numCPUs; i++) {
  const worker = cluster.fork();
  console.log(`主进程发送消息给worker:${worker.id}`);
  worker.send(`hello,worker:${worker.id}`);
}

cluster.on("exit", (worker, code, signal) => {
  console.log(
    `工作进程 ${worker.process.pid} 已退出,code:${code},signal:${signal}`
  );
  cluster.fork();
});
