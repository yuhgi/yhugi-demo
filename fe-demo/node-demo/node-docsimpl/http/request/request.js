'use strict';
const http = require('http');
const querystring = require('querystring');
const Buffer = require('buffer').Buffer;

let postData = querystring.stringify({
    'msg':'Hello World'
});

var options = {
    hostname:'127.0.0.1',
    port:80,
    path:'/upload',
    method:'POST',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Content-Length':Buffer.byteLength(postData),
        'Expect':'100-continue'
    },
    //auth:'mary:124',
    // agent:new http.Agent({
    //     keepAlive:true
    // })
};

let req  = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`RawHeaders; ${res.rawHeaders}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end',() => {
        console.log('No more data in response');
    });
});

req.on('error',(e) => {
    console.log(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();