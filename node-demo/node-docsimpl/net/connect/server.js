const net = require('net');

const port = 8888;
const hostname = '127.0.0.1';

var server = net.createServer((conn) => {
    // connect事件
    console.log('client connected');
    conn.setEncoding('utf-8');
    conn.on('end',() => {
        console.log('client disconnected');
    });
    
    conn.on('data',(data) => {
        console.log('receive from %s:%d',conn.remoteAddress,conn.remotePort);
        console.log(data);
        conn.write('server message');
    });
});

server.on('error', (err) => {
    if(err.code === 'ECONNRESET'){
        console.log('client close the connection');
        return;
    }
    console.log(err);
});

server.listen(port,hostname,() => {
    console.log(`server is bounded on %s:%d`,hostname,port);
});