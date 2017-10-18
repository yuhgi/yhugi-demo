function curring(fn){
  var slice = Array.prototype.slice;
  var __args = slice.call(arguments,1);
  return function(){
    var __inargs = slice.call(arguments);
    return fn.apply(null,__args.concat(__inargs));
  };
}