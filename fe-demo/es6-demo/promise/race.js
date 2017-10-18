let promises = [1000,3000].map((time) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => reject(new Error(time + ' timeout')),time);
  });
});

let p = Promise.race(promises);

p.then((result) =>{
  console.log(result);
}).catch((err) =>{
  console.log(err);
});