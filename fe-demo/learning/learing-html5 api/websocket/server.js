var WebSocket = require('./WebSocket');

var server = WebSocket.createServer(function(ws){
  console.log("新建一个socket");
  ws.on('message',function(msg){
    console.log("接收到一条消息："+msg);
    this.send("echo:"+msg);
  });
}).listen(8888);

console.log("Server is running at http://127.0.0.1:8888");