'use strict';
function sayHi(condition){
    if(condition){
        let msg = 'Hello world';
        console.log(msg); // Hello world
    }else{
        console.log(msg); // ReferenceError: msg is not defined
    }
}

sayHi(true);
sayHi(false);