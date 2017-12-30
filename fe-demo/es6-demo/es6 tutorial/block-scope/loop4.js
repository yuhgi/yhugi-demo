'use strict';
var funcs = [];
for(let i = 0;i < 10;i++){
    funcs.push(function(){console.log(i);});
}

funcs.forEach(function(func){
    func(); // outputs 0, then 1, then 2, up to 9
});