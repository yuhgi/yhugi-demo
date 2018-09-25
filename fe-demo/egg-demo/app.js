const cluster = require('cluster');

module.exports = app => {
    const worker = cluster.worker;
    app.messenger.on('agent_action',data => {
        console.log(`worker:${worker.id},pid:${worker.process.pid},,接收到agent_action,${data}`);
    });
    app.messenger.on('broadcast_action',data => {
        console.log(`worker:${worker.id},pid:${worker.process.pid},接收到broadcast_action,${data}`);
    });
    app.messenger.once('egg-ready', () => {
        app.messenger.broadcast('broadcast_action',`这是一条广播消息:${worker.id}`);
    });
    
};