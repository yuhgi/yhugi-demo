const http = require('http');

var server = http.createServer((req,res) => {
    // req is an http.IncomingMessage, which is a Readable Stream
    // res is an http.ServerResponse, which is a Writable Stream

    var body = '';

    // we want to get the data as utf8 strings
    // if you don't set an encoding, then you'll get Buffer objects
    req.setEncoding('utf8');

    req.on('data',(chunk) => {
        body += chunk;
    });

    req.on('end',() => {
        try{
            const data = JSON.parse(body);

            res.write(typeof data);
            res.end();
        }catch(err){
            res.statusCode = 400;
            return res.end(`error: ${err.message}`);
        }
    });
});

var port = 1337;
var hostname = '192.168.0.221';

server.listen(port,hostname,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('server is bound on ' +hostname+':'+port );
});