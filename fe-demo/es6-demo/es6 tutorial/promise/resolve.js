//参数是一个Promise对象
let promise = Promise.resolve(new Promise((resolve) => resolve('resolve promise')));
promise.then((result) => console.log(result));

//参数是一个thenable对象
let thenable = {
  then:(resolve,reject) => {
    resolve('resolve thenable');
  }
};

let promise1 = Promise.resolve(thenable);
promise1.then((result) => console.log(result));

//参数是不具有thenable方法的对象，或者根本不是对象
let promise2 = Promise.resolve('hello promise');
promise2.then((result) => console.log(result));

//参数为空
let promise3 = Promise.resolve();
promise3.then((result) => console.log(result));
