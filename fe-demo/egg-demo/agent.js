module.exports = agent => {
    agent.messenger.on('egg-ready',() => {
        const data = {};
        agent.messenger.sendToApp('agent_action',data);
    });
    agent.messenger.on('broadcast_action',data => {
        console.log(`agent,接收到broadcast_action`);
    });
};