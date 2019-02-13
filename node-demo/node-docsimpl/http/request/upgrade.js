'use strict';
const http = require('http');

var server = http.createServer((req,res) => {
    res.writeHead(200,{
        'Content-Type':'text-plain'
    });
    res.end();
});

server.on('upgrade',(req,socket,head) => {
    console.log('server received a upgrade request');
    console.log(req.headers);
    socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n'+
                'Upgrade:Websocket\r\n'+
                'Connection:Upgrade\r\n'+
                '\r\n'
    );
    socket.pipe(socket);
});

server.listen(1337,'127.0.0.1',() => {
    console.log('server is listenning on 127.0.0.1:1337');
    var options = {
        port:1337,
        hostname:'127.0.0.1',
        headers:{
            'Connection':'Upgrade',
            'Upgrade':'websocket'
        }
    };

    var req = http.request(options);
    req.end();

    req.on('upgrade',(res,socket,upgradeHead) => {
        console.log('got upgraded!');
        console.log(res.headers);
        socket.end();
        process.exit(0);
    });
});

