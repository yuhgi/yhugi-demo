function timeout(ms){
  return new Promise(function(resolve,reject){
    console.log('Promise process immediately');
    setTimeout(resolve,ms,'done');
  });
}

timeout(2000).then(function(value){
  console.log(value);
});