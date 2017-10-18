var PubSub = {};

(function(p){
  var _events = {};

  p.publish = function(event){
    var args = Array.prototype.slice.call(arguments,1);
    if(!_events[event]) return;
    _events[event].forEach(function(callback){
      callback.apply(callback,args);
    });
  };

  p.subscribe = function(event,callback){
    if(!_events[event]){
      _events[event]=[];
    }
    _events[event].push(callback);
  };

  p.unsubscribe = function(event,callback){

    var funcArr = _events[event],
        len = funcArr.length,
        i;
    if(!funcArr||len==0)return;
    for(i=0,len=funcArr.length;i<len;i++){
      if(funcArr[i]==callback){
        funcArr.splice(i,1);
      }
    }
  };
})(PubSub);