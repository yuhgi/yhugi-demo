document.getElementById('btn1').onclick = function(e){
  console.log(this)
}
document.getElementById('btn2').onclick = function(e,a,b){
  console.log(this)
}.bind(this,1,2,3)

console.log(null||[])
console.log(''||'dfd')

console.log({1:1}||{})

/*var now,
    current;
now = new Date().getTime();

var cycleTimes = 1000000000;

for(var i =0;i<cycleTimes;i++){
  temp = ~~123;
}
current = new Date().getTime()
console.log("~~耗费"+(current-now)+"毫秒")

now = new Date().getTime();

for(var i =0;i<cycleTimes;i++){
  temp = parseInt(123);
}
current = new Date().getTime()
console.log("parseInt耗费"+(current-now)+"毫秒")

now = new Date().getTime();

for(var i =0;i<cycleTimes;i++){
  temp = Number(123);
}
current = new Date().getTime()
console.log("Number耗费"+(current-now)+"毫秒")*/




