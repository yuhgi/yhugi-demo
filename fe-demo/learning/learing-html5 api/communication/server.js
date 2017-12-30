
var http = require('http');
debugger;
http.createServer(function(request,response){
  if(request.method == 'POST'){
    console.log("POST请求");
    console.log(request.headers);
    var message = "Upload to geodata.example.net complete";
    response.writeHead(200,{
      'Content-Type':'text/plain',
      "Access-Control-Allow-Origin": "http://localhost:11349",
      "Content-Length" : message.length.toString()
    });
    response.end(message);
  }

  if(request.method == 'OPTIONS'){
    console.log("OPTIONS请求");
    console.log(request.headers);
    response.writeHead(200,{
      'Content-Type':'text/plain',
      "Access-Control-Allow-Origin": "http://localhost:11349",
      "Content-Length" : '1'
    });
    response.end('hello');
  }

}).listen(8888);

console.log("Server is running at http://127.0.0.1:8888");