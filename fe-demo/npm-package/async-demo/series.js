var series =  require('async/series');

series([
    function(callback){
        callback(null,'one');
    },
    function(callback){
        callback(null,'two');
    }
],function(err,result){
    debugger
});