var http = require('http');
var assert = require('assert');
var url = require('url');

function start(route,handle){
    var hostName = "localhost";
    var port = 8888;
    var onRequest = function(req,res){
        var pathname = url.parse(req.url).pathname;
        console.log("request for " + pathname + " received.");

        route(handle,pathname,res,req);
    };
    var server = http.createServer(onRequest);

    server.listen(port,hostName,function(err){
        assert.equal(err,null);
        console.log('server is listening on '+hostName+':'+port);
    });
}

module.exports = {
    start:start
};







