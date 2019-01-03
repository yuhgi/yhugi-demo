var http = require('http');

var server = http.createServer(function(req,res){
  var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
  switch(path){
    case '':
      res.writeHead(200,{'Content-Type':'text-plain'});
      res.end('Homepage');
      break;
    case '/about':
      res.writeHead(200,{'Content-Type':'text-plain'});
      res.end('About');
      break;
    default:
      res.writeHead(404,{'Content-Type':'text-plain'});
      res.end('Not Found');
      break;
  }
});

server.listen(3000,function(){
  console.log('server is listening at http://localhost:3000');
});