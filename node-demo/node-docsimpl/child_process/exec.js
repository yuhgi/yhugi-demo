const exec = require('child_process').exec;

exec('dir',function(err,stdout,stderr){
    if(err){
        console.error('exec error ${err}');
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
},{
    encoding:'utf8'
});