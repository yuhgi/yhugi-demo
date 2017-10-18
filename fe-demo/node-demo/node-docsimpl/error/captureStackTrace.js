
const myObject = {};

Error.captureStackTrace(myObject);
console.log(myObject.stack);


function MyError(){
    Error.captureStackTrace(this,MyError);
}


console.log(new MyError().stack);