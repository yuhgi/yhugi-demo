var http = require('http'),
    fs = require('fs');

function serverStaticFile(res,path,contentType,responseCode){
  if(!responseCode) responseCode = 200;
  fs.readFile(__dirname+path,function(err,data){
    if(err){
      res.writeHead(500,{'Content-Type':'text:plain'});
      res.end('500 - Internal Error');
    }else{
      res.writeHead(responseCode,{'Content-Type':contentType});
      res.end(data);
    }
  });
}

var server = http.createServer(function(req,res){
  var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
  switch(path){
    case '':
      serverStaticFile(res,'/public/home.html','text/html');
      break;
    case '/about':
      serverStaticFile(res,'/public/about.html','text/html');
      break;
    case '/img/logo.jpg':
      serverStaticFile(res,'/public/img/logo.jpg','image/jpeg');
      break;
    default:
      serverStaticFile(res,'/public/404.html','text/html',404);
      break;
  }
});

server.listen(3000,function(){
  console.log('server is listening at http://localhost:3000');
});