var fs = require('fs');

var writable = fs.createWriteStream("./tmp.txt");

// write the data to the supplied writable stream one million times
function writeOneMillionTimes(writer,data,encoding,callback){
    var i = 1000000;
    write();
    function write() {
        var ok = true;
        do{
            i-=1;
            if(i === 0){
                writer.write(data,encoding,callback);
            }else{
                // see if we should continue, or wait
                // don't pass the callback, because we're not done yet
                ok = writer.write(data,encoding);
            }
            if(!ok){
                console.log('wait at %d',i);
            }
        }while(i>0&&ok);

        if(i>0){
            writer.once('drain',() => {
                console.log('we can write again');
                write();
            });
        }
    }
}

writeOneMillionTimes(writable,'1\r\n','utf-8',() => {
    console.log('write had been done');
});