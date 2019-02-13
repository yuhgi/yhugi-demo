const http = require('http');
const net = require('net');
const url = require('url');

// 创建一个http管道
var proxy = http.createServer((request,response) => {
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.end('okay');
});

proxy.on('connect',(request,cltSocket,head) => {
    console.log(request.headers);
    var srvUrl = url.parse(`http://${request.url}`);
    var srvSocket = net.connect(srvUrl.port,srvUrl.hostname, () => {
        // 与目标server建立连接后，代理服务器就可以告诉客户端CONNECT已经成功建立
        cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');
        srvSocket.write(head);
        srvSocket.pipe(cltSocket); 
        cltSocket.pipe(srvSocket);
    });
    srvSocket.on('error',(err) => {
        console.log(err.code);
        console.log(err.stack);
    });
});

proxy.listen(1337,'127.0.0.1',() => {
    // listening事件
    var options = {
        port:1337,
        hostname:'127.0.0.1',
        method:'CONNECT',
        path:'127.0.0.1:80'
    };
    var req = http.request(options);
    req.end();

    req.on('connect',(response,socket,head) => {
        // CONNECT已经建立
        console.log('got connected');
        socket.write('GET / HTTP/1.1\r\n' +
                 'Host: www.google.com:80\r\n' +
                 'Connection: close\r\n' +
                 '\r\n');
        console.log(response.headers);
        socket.on('data',(chunk) => {
            console.log(chunk.toString());
        });
        socket.on('end',() => {
            //proxy.close();
        });
    });
});