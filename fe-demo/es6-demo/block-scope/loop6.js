'use strict';

var funcs = [];
for(const i=0;i<10;i++){ // TypeError: Assignment to constant variable
    funcs.push(function(){
        console.log(i);
    });
}