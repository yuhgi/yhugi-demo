var net = require('net');


var port = 8181;
var hostname = "localhost";
var server = net.createServer(function(conn){

});


server.on('error',(err) => {
    if(err.code === 'EADDRINUSE'){
        console.log('Address in use, retrying...');
        setTimeout(() => {
            server.close();
            server.listen(port);
        },1000);
    }
});

server.listen(port,hostname,function(){
    console.log("server bounded on ",server.address());
});
