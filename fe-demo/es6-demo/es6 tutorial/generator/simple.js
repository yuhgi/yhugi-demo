function* helloGenerator(){
  yield 'hello';
  yield 'world';
  return 'end';
}

let hw = helloGenerator();

console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());