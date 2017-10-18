//事件监听
var EventUtil = {
  addHandler:function(element,type,handler){
    if(element.addEventListener){
      element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
      element.attachEvent("on"+type,handler);
    }else{
      element["on"+type]=handler;
    }
  },
  removeHandler:function(element,type,handler){
    if(element.removeEventListener){
      element.removeEventListener(type,handler,false);
    }else if(element.detachEvent){
      element.detachEvent("on"+type,handler);
    }else{
      element["on"+type]=null;
    }
  },
  //获取事件对象
  getEvent:function(event){
    return event?event:window.event;
  },
  //获取事件对象的目标元素
  getTarget:function(event){
    return event.target||event.srcElement;
  },
  //阻止默认行为
  preventDefault:function(event){
    if(event.preventDefault()){
      event.preventDefault();
    }else{
      event.returnValue = false;
    }
  },
  //停止事件冒泡
  stopPropagation:function(event){
    if(event.stopPropagation){
      event.stopPropagation();
    }else{
      event.cancelBubble = true;
    }
  }
};

var getCss = function(o,key){
  return o.currentStyle?o.currentStyle[key]:
    document.defaultView.getComputedStyle(o,false)[key];
};

var extend = function(target,src){
  if(typeof src == "object"&&typeof target=="object"){
    for(var key in src){
      if(src.hasOwnProperty(key)){
        target[key] = src[key];
      }
    }
    return target;
  }
};

/**
 * 图片切割
 * @param {[string]} imgUrl      [图片url]
 * @param {[HTMLElement]} srcElement  [背景div]
 * @param {[HTMLElement]} viewElement [预览div]
 * @param {[object]} options     [配置对象]
 */
function ImageCropper(imgUrl,srcElement,viewElement,options){
  this.imgUrl = imgUrl;
  this.srcElement = srcElement;
  this.viewElement = viewElement;
  options = typeof options === "object"?options:{};
  this.options = extend(this.defaultOptions,options);
  this.initialize();
}

ImageCropper.prototype = {
  constructor:ImageCropper,
  defaultOptions:{
    dragWidth:128,
    dragHeight:128,
    bgOpacicy:0.5
  },
  dragTarget:null,
  initialize:function(){
    var document = window.document;
    var srcStyle = this.srcElement.style,
        srcPosition = srcStyle.position,
        viewStyle = this.viewElement.style,
        viewPosition = viewStyle.position;
    if(srcPosition != "relative"&&srcPosition!="absolute"){
      srcStyle.position = "relative";
    }
    srcStyle.overflow ="hidden";
    srcStyle.zIndex="10";

    if(viewPosition != "relative"&&viewPosition!="absolute"){
      viewStyle.position = "relative";
    }
    viewStyle.overflow ="hidden";
    viewStyle.zIndex="10";

    //创建图片
    this.bgImg = document.createElement("img");//背景图片
    this.bgImg.src = this.imgUrl;
    var bgStyle = this.bgImg.style;
    bgStyle.opacity = this.options.bgOpacicy;
    bgStyle.zIndex = 20;
    bgStyle.position="absolute";
    bgStyle.top=0;
    bgStyle.left=0;

    this.clipImg = document.createElement("img");//只显示截取部分的图片
    this.clipImg.src = this.imgUrl;
    var clipStyle = this.clipImg.style;

    clipStyle.zIndex = 30;
    clipStyle.position="absolute";
    clipStyle.top=0;
    clipStyle.left=0;
    clipStyle.clip = "rect(50px 178px 178px 50px)";

    this.viewImg = document.createElement("img");//背景图片
    this.viewImg.src = this.imgUrl;

    var viewImgStyle = this.viewImg.style;
    viewImgStyle.zIndex = 20;
    viewImgStyle.position="absolute";
    viewImgStyle.top=0;
    viewImgStyle.left=0;

    this.createDrag();


    this.srcElement.appendChild(this.bgImg);
    this.srcElement.appendChild(this.clipImg);

    this.viewElement.appendChild(this.viewImg);
  },
  createDrag:function(){
    //创建拖放对象
    var that = this;
    this.dragTarget = new DragTarget(
      this.srcElement,
      this.options.dragWidth,
      this.options.dragHeight,{
        onDragMove:dragMoveHandler
      }
    );
    function dragMoveHandler(element,params){
      var top  = params.top+"px",
          left = params.left+"px",
          right = (params.left+params.width)+"px",
          bottom = (params.top+params.height)+"px";
      //设置clipImg的可见范围
      that.clipImg.style.clip = "rect("+top+" "+right+" "+bottom+" "+left+")";
      //设置预览图片的位置
      var viewImgStyle = that.viewImg.style;
      viewImgStyle.top = "-"+top;
      viewImgStyle.left = "-"+left;
    }
  },
  getPos:function(){
    return this.dragTarget.getPos();
  }
};

// 拖放对象
function DragTarget(container,width,height,options){
  this.container = container;
  this.width=width;
  this.height=height;
  options = typeof options === "object"?options:{};
  this.options = extend(this.defaultOptions,options);
  this.initialize();
}

DragTarget.prototype = {
  constructor:DragTarget,
  defaultOptions:{
    border:'1px dashed #DDD',
    width:128,
    height:128,
    left:50,
    top:50,
    onDragStart:null,
    onDragMove:null,
    onDragDrop:null
  },
  initialize:function(){
    var document = window.document,
        dragElement = document.createElement('div'),
        style = dragElement.style;
    this.dragElement = dragElement;

    style.width = this.width+"px";
    style.height = this.height+"px";
    style.border = this.options.border;
    style.zIndex = 200;
    style.cursor = "move";
    style.position ="absolute";
    style.left=this.options.left+"px";
    style.top = this.options.top+"px";
    //触发一次dragmove事件
    if (typeof this.options.onDragMove == "function") {
      this.options.onDragMove(dragElement,{
        left:parseInt(style.left),
        top:parseInt(style.top),
        width:parseInt(style.width),
        height:parseInt(style.height)
      });
    }
    this.dragParams = {
      left:0,
      top:0,
      currentX:0,
      currentY:0,
      isDrag:false
    };
    this.container.appendChild(dragElement);
    this.bindEvents();

  },
  bindEvents:function(){
    var that = this;
    EventUtil.addHandler(this.dragElement,'mousedown',start);
    EventUtil.addHandler(this.dragElement,'mousemove',move);
    EventUtil.addHandler(this.dragElement,'mouseup',stop);
    EventUtil.addHandler(this.dragElement,'mouseout',stop);
    var params = that.dragParams,
        dragElement = that.dragElement;
    if(getCss(dragElement, "left") !== "auto"){
      params.left = getCss(dragElement, "left");
    }
    if(getCss(dragElement, "top") !== "auto"){
      params.top = getCss(dragElement, "top");
    }
    function start(e){

      params.isDrag = true;
      e = EventUtil.getEvent(e);

      params.currentX = e.clientX;
      params.currentY = e.clientY;
      if (typeof that.options.onDragStart == "function") {
        that.options.onDragStart();
      }
    }

    function move(e){
      e = EventUtil.getEvent(e);
      if(params.isDrag){
        var nowX = e.clientX, nowY = e.clientY;
        var disX = nowX - params.currentX, disY = nowY - params.currentY;
        dragElement.style.left = parseInt(params.left) + disX + "px";
        dragElement.style.top = parseInt(params.top) + disY + "px";
      }

      if (typeof that.options.onDragMove == "function") {
        that.options.onDragMove(that,{
          left:parseInt(getCss(dragElement,"left")),
          top:parseInt(getCss(dragElement,"top")),
          width:parseInt(getCss(dragElement,"width")),
          height:parseInt(getCss(dragElement,"height"))
        });
      }
    }

    function stop(e){
      params.isDrag = false;
      if(getCss(dragElement, "left") !== "auto"){
        params.left = getCss(dragElement, "left");
      }
      if(getCss(dragElement, "top") !== "auto"){
        params.top = getCss(dragElement, "top");
      }
      if (typeof that.options.onDragDrop == "function") {
        that.options.onDragDrop();
      }
    }
  },
  getPos:function(){
    var dragElement = this.dragElement;
    return {
      left:parseInt(getCss(dragElement,"left")),
      top:parseInt(getCss(dragElement,"top")),
      width:parseInt(getCss(dragElement,"width")),
      height:parseInt(getCss(dragElement,"height"))
    };
  }
};