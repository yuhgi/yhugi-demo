let t1 = new Promise(function(resolve,reject){
  setTimeout(resolve,2000,'t1 done');
});

t1.then((result) => {
  console.log('t1 resolve callback');
  return new Promise(function(resolve,reject){
    reject('t2 done');
  });
},(result) => {
  console.log('t1 reject callback');
  return result;
}).then((result) => {
  console.log('t2 resolve callback,'+result);
},(result) => {
  console.log('t2 reject callback,'+result);
});