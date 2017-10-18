(function(window){
  var TOUCHSTART,TOUCHEND;
  if(typeof window.ontouchstart !== 'undefined'){
    TOUCHSTART='touchstart';
    TOUCHEND='touchend';
  }else if(typeof window.onmspointerdown != 'undefined'){
    TOUCHSTART='MSPointerDown';
    TOUCHEND='MSPointerUp';
  }else{
    TOUCHSTART='mousedown';
    TOUCHEND='mouseup';
  }

  function NodeFacade(node){
    this._node = node;
  }

  NodeFacade.prototype.getDomNode = function(){
    return this._node;
  };

  NodeFacade.prototype.on = function(evt,callback){
    if(evt === 'tap'){
      this._node.addEventListener(TOUCHSTART,callback);
    }else if(evt === 'tapend'){
      this._node.addEventListener(TOUCHEND,callback);
    }else{
      this._node.addEventListener(evt,callback);
    }
    return this;
  };

  NodeFacade.prototype.off = function(evt,callback){
    if(evt === 'tap'){
      this._node.removeEventListener(TOUCHSTART,callback);
    }else if(evt === 'tapend'){
      this._node.removeEventListener(TOUCHEND,callback);
    }else{
      this._node.removeEventListener(evt,callback);
    }
    return this;
  };

  window.$ = function(selector){
    var elem = document.querySelector(selector);
    if(elem){
      return new NodeFacade(elem);
    }else {
      return null;
    }
  };
})(window);
