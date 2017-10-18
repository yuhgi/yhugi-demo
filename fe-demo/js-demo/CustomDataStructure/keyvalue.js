var KeyValue = function(key,value){
  this.key = key;
  this.value = value;
};

KeyValue.prototype.toJSON = function(){
  var obj ={};
  obj[this.key]=this.value;
  return obj.toJSON();
};

var kv1 = new KeyValue("a","1");

console.log(kv1);
console.log(kv1.toJSON());