let promises = [2,3,5,7,11,13].map((item) => {
  return new Promise((resolve,reject) => {
    //resolve(item+' resolve');
    if(item>6){
      reject(item+' reject');
    }else{
      resolve(item+' resolve');
    }
  });
});

Promise.all(promises).then((results) => {
  console.log(results);
}).catch((err) => {
  console.log(err);
});