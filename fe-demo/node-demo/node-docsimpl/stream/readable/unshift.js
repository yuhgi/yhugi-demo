var net = require('net');

const StringDecoder = require("string_decoder").StringDecoder;

/*
 * @param {stream} stream - 要被解析的流
 * @param {function} callback - 回调函数(error,header,stream)
 */
function parseHeader(stream,callback){
    stream.on('error',callback);
    stream.on('readable',onReadable);

    var decoder = new StringDecoder('utf-8');
    var header = '';
    function onReadable(){
        var chunk;
        while(null !== (chunk = stream.read())){
            var str = decoder.write(chunk);
            if(str.match(/\n\n/)){
                // found the header boundary
                var split = str.split(/\n\n/);
                header += split.shift();

                var remaining = split.join('\n\n');
                var buf = new Buffer(remaining,'utf-8');
                if(buf.length){
                    stream.unshift(buf);
                }

                stream.removeListener('error',callback);
                stream.removeListener('readable',onReadable);

                // now the body of the message can be read from the stream
                callback(null,header,stream);
            }else{
                // still reading the header
                header += str;
            }
        }
    }
}

var server = net.createServer((socket) => {
    parseHeader(socket, (err,header,stream) => {
        if(err){
            console.log(err);
            return;
        }
        console.log("header:\n",header);
        stream.on('data', (data) => {
            console.log(data);
            stream.write('HTTP 200 OK\n\n ');
            stream.end();
        });

        stream.on('end',() => {
            console.log("socket is ended");
        });
        stream.resume();

    });
});

server.listen(8888,"192.168.0.221",() => {
    var address = server.address();
    console.log("server bounded on " + address.address+":"+address.port);
});