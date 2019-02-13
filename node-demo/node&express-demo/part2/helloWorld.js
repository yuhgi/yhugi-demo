var http = require('http');

var server = http.createServer(function(req,res){
  res.writeHead(200,{
    'Content-Type':'text-html'
  });
  res.end('<html>Hello World</html>',function(){
    console.log('a response is sent');
  });
});

server.listen(3000,function(){
  console.log('Server is listening on http://localhost:3000/');
});
