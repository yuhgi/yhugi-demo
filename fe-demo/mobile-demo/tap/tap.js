function addTapListener(elem,callback){
  var startEvent = 'mousedown',
      endEvent = 'mouseup';
  if(typeof(window.ontouchstart)!='undefined'){
    //touch events work
    startEvent = 'touchstart';
    endEvent = 'touchend';
  }

  elem.addEventListener(startEvent,function(e){
    var tap = document.createEvent('CustomEvent');
    tap.initCustomEvent('tap',true,true,null);
    elem.dispatchEvent(tap);
  });

  elem.addEventListener(endEvent,function(e){
    var tapend = document.createEvent('CustomEvent');
    tapend.initCustomEvent('tapend',true,true,null);
    elem.dispatchEvent(tapend);
  });

  elem.addEventListener('tap',callback);
}