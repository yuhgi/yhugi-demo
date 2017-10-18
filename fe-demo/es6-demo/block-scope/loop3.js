var funcs = [];
for(var i = 0;i < 10;i++){
    funcs.push((function(val){
        return function(){console.log(val);};
    })(i));
}

funcs.forEach(function(func){
    func(); // outputs 0, then 1, then 2, up to 9
});