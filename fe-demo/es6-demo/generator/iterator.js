let myIterable = {};

function* IteratorGenerator(){
  yield 1;
  yield 2;
  yield 3;
}
myIterable[Symbol.iterator] = IteratorGenerator;
console.log(...myIterable);
