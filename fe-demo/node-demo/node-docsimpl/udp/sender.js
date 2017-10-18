'use strict';
const dgram = require('dgram');
const message = new Buffer('Hello world!');

const client = dgram.createSocket('udp4');

var send = () => {
    client.send(message,0,message.length,42234,'127.0.0.1',(err) => {
        if(err){
            console.log(err.stack);
        }
    });
};

var sendInterval = () => {
    setTimeout(() => {
        send();
        sendInterval();
    },1000);
};

// 开始发送数据
sendInterval();

