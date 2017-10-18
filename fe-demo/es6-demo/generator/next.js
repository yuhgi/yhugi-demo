function* G(){
  console.log(yield 1);
  console.log(yield 2);
}

let g = new G();

//next方法的参数作为上一次yield语句的返回值
console.log(g.next('stage 0'));
console.log(g.next('stage 1'));
console.log(g.next('stage 2'));
console.log(g.next());