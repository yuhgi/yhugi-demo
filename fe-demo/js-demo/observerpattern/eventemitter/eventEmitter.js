var EventEmitter = {
  _events:{},
  addEventListener:function(event,callback){
    if(!this._events[event]){this._events[event]=[];}
    this._events[event].push(callback);
  },
  removeEventListener:function(event,callback){

  },
  dispatchEvent:function(event){
    var i,len;
    if(!this._events[event])return;
    for()
  }
}
