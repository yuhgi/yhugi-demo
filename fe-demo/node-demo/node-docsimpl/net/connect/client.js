'use strict';
const net = require('net');
const util = require('util');

const client = net.connect({
    port:8888,
},() => {
    // connect事件
    console.log('connected to server');
    let content = util.format(`i am %s:%d \r\n`,client.localAddress,client.localPort);
    client.write(content);
});

client.setEncoding('utf-8');

client.on('error', (err) => {
    if(err.code === 'ECONNREFUSED'){
        console.log(`server on %s:%d is not available`);
    }
    console.log(err);
});

client.on('data',(data) => {
    console.log(data);
    client.end();
});


client.on('end',() => {
    console.log('disconnected from server');
});
