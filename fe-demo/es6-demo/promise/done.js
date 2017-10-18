Promise.prototype.done = (onFulfilled,onRejected) => {
  this.then(onFulfilled,onRejected)
    .catch((err) => {
      setTimeout(() => {throw err;},0);
    });
};