let p1 = new Promise(function(reslove,reject){
  console.log('p1 start process');
  setTimeout(() => {
    console.log('p1 timeout');
    reject(new Error('p1 fail'));
  },3000);
});

let p2 = new Promise((reslove,reject) => {
  console.log('p2 start process');
  setTimeout(() => {
    console.log('p2 timeout');
    reslove(p1);
  },2000);
});

p2.then((result) => {
  console.log('p2 resolved');
  console.log(result);
})
  .catch((error) => console.log(error));
