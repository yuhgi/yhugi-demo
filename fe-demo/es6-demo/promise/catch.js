/*
let p = new Promise(function(resolve,reject){
  //resolve('p1 resolve');
  reject('p1 reject');
});

p.then((result) => console.log('fulfilled,'+result))
 .catch((result) => console.log('rejected,'+result));
 */

/*
let p = new Promise(function(resolve,reject){
  resolve('p1 resolve');
  //reject('p1 reject');
});
p.then((result) => {
  console.log('fulfilled,'+result);
  throw new Error('p1 exception');
})
 .catch((result) => console.log(result));
 */

/*
let promise = new Promise(function(resolve,reject){
  resolve('p1 resolve');
  throw new Error('test');
});

promise.then((result) => console.log(result))
  .catch((err) => console.log(err));
 */

/*
let promise = new Promise(function(resolve,reject){
  //reject('p1 reject');
  //throw new Error('throw p1 error');
  resolve(new Error('p1 error'));
});

promise.then((result) => console.log(result))
  .then((result) => console.log(result))
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
 */

/*
var someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});
 */

/*
let process = require('process');
process.on('unhandledRejection',(err,p) => {
  console.log('catch:'+ err.stack);
});

let promise = new Promise((resolve,reject) => {
  resolve('ok');
  setTimeout(() => {throw new Error('throw a error');},1000);
});

promise.then((result) => console.log(result));
*/

