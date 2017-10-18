'use strict';
const http = require('http');
const querystring = require('querystring');
const hostname = 'localhost',
    port = '80';

let server = http.createServer((request,response) => {
    // request事件
    console.log(`request rawHeaders: ${request.rawHeaders}`);
    console.log(`request headers: ${JSON.stringify(request.headers)}`);
    request.setEncoding('utf8');
    let data = '';
    request.on('data', (chunk) => {
        data += chunk;
    });
    request.on('end',() => {
        console.log(`received all data : ${querystring.parse(data)}`);
        response.writeHead(200,{
            'Content-Type':'text/json'
        });
        response.write(JSON.stringify({
            a:1,
            b:2
        }));
        response.end();
    });
});

server.listen(port,hostname,(error)=>{
    // listening事件
    if(error){
        console.log(error);
        return;
    }
    console.log(`server is listening on ${hostname}:${port}`);
});