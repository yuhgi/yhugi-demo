function sayHi(condition){
    if(condition){
        var msg = 'Hello world';
        console.log(msg); // Hello world
    }else{
        console.log(msg); // undefined
    }
}


sayHi(true);
sayHi(false);