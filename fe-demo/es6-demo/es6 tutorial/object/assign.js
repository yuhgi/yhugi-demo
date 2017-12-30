let a = {
  a:1
};

let b = {
  b:2,
  c:{
    d:1
  }
};

Object.assign(a,b);

console.log(a);
console.log(a.c ===
 b.c);

