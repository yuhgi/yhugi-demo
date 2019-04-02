(function(R) {
  function Simulation(paper) {
    this.paper = paper;
    this.container = paper.canvas.parentNode;
    this.containerRect = this.container.getBoundingClientRect();
    this.rotateDeg = 30;
    this.opacity = 0.5;
    this.fontSize = 12;
    this.lineWidth = 2;
    this.unit = 'm';
    this.simSet = null; // 模拟的元素集合
    this.measureHintSet = null; // 测距提示的元素集合
    this.measureSet = null; // 测距绘制的元素集合
    this.onMouseDownHandler = this.onMouseDown.bind(this);
    this.onMouseMoveHandler = this.onMouseMove.bind(this);
    this.onContextmenuHandler = this.onContextmenu.bind(this);
    this.measureStarted = false; // 起点已经存在
    this.measureEnabled = false; // 是否打开比例尺测距功能
    this.cachePoints = []; // 缓存的点
    this.cacheElement = null; // 缓存元素
    this.measureCallback = null; // 回调函数
  }

  function getLineParam(points) {
    var pathArr = [];
    for (var i = 0, len = points.length; i < len; i++) {
      var point = points[i];
      if (i === 0) {
        pathArr.push("M" + point.x + "," + point.y);
      } else {
        pathArr.push("L" + point.x + "," + point.y);
      }
    }
    return pathArr.join();
  }

  function getEllipsePoints(x,y,a,b,negative){
    var x1,y1,i,cnt = 1000,tempList=[],list=[];
    var step = x/cnt;
    if(!negative){ // 获取从正上方，顺时针到正下方的点位
      for(i=0;i<cnt;i++){
        x1 = i*step;
        y1 = Math.sqrt(Math.pow(b,2) - (Math.pow(b,2)/Math.pow(a,2))*Math.pow(x1,2));
        tempList.push({
          x:x1+x,
          y:y1+y
        });
      }
      for(i=cnt-1;i>=0;i--){
        list.push({
          x:tempList[i].x,
          y:-tempList[i].y + y*2
        })
      }
      return tempList.concat(list);
    }else{ // 获取从正下方，顺时针到正上方的点位
      for(i=0;i<cnt;i++){
        x1 = i*step;
        y1 = Math.sqrt(Math.pow(b,2) - (Math.pow(b,2)/Math.pow(a,2))*Math.pow(x1,2));
        tempList.push({
          x:x-x1,
          y:-y1+y
        });
      }
      for(i=cnt-1;i>=0;i--){
        list.push({
          x:tempList[i].x,
          y:-tempList[i].y + y*2
        })
      }
      console.log(tempList.concat(list))
      return tempList.concat(list);
    }
    
  }

  // 同心圆绘制
  Simulation.prototype.concentricCircle = function(opt) {
    var paper = this.paper;
    var opacity = this.opacity;
    var fontSize = this.fontSize;
    var lineWidth = this.lineWidth;
    var rotateDeg = this.rotateDeg;
    var unit = opt.unit || this.unit;
    var mode = opt.mode;
    var x = opt.x;
    var y = opt.y;
    var circleList = opt.circleList;
    var i, len, temp, circleEl, lineEl, textEl, lineStr;

    paper.setStart();
    for (i=0, len = circleList.length; i < len; i++) {
      temp = circleList[i];
      circleEl = paper.circle(x, y, temp.radius);
      lineStr = getLineParam([{x:x,y:y},{x:x+temp.radius,y:y}])
      lineEl = paper.path(lineStr);
      textEl = paper.text(x+temp.radius/2,y+fontSize/2,temp.radius + unit);
      if (mode === "fill") {
        circleEl.attr("fill", temp.color);
        circleEl.attr("stroke-width", 0);
        circleEl.attr("opacity", opacity);
        
      } else {
        circleEl.attr("stroke-width", lineWidth);
        circleEl.attr("stroke", temp.color);
      }
      lineEl.rotate(-i*rotateDeg,x,y);
      lineEl.attr('stroke',temp.color);
      lineEl.attr('stroke-width',lineWidth);

      textEl.rotate(-i*rotateDeg,x,y);
      textEl.attr('fill',temp.color);
      textEl.attr('font-size',fontSize);
    }
    this.simSet = paper.setFinish();
    this.simSet.forEach(function(el){
        if(el.type === 'path' || el.type === 'text'){
            el.toFront();
        }
    })
  };
  // 相切圆绘制
  Simulation.prototype.tangentCircle = function(opt) {
    var paper = this.paper;
    var lineWidth = this.lineWidth;
    var opacity = this.opacity;
    var mode = opt.mode;
    var color = opt.color || '#f00';
    var rotate = opt.rotate;
    var x = opt.x;
    var y = opt.y;
    var circleList = opt.circleList;
    var i, len, temp, circleEl;
    paper.setStart();
    for (i=0, len = circleList.length; i < len; i++) {
        temp = circleList[i];
        circleEl = paper.circle(x + temp.x, y, temp.radius);
        if(rotate){
          circleEl.rotate(rotate,x,y);
        }
        if (mode === "fill") {
          circleEl.attr("fill", color);
          circleEl.attr("stroke-width", 0);
          circleEl.attr("opacity", opacity);
          
        } else {
          circleEl.attr("stroke-width", lineWidth);
          circleEl.attr("stroke", color);
        }
    }
    this.simSet = paper.setFinish();
  };
  // 不规则椭圆绘制
  Simulation.prototype.IrregularCircle = function(opt) {
    var paper = this.paper;
    var lineWidth = this.lineWidth;
    var mode = opt.mode;
    var x = opt.x;
    var y = opt.y;
    var rotate = opt.rotate;
    var color = opt.color || '#0088FF';
    var radiusX1 = opt.radiusX1;
    var radiusX2 = opt.radiusX2;
    var radiusY = opt.radiusY;

    var points = getEllipsePoints(x,y,radiusX1,radiusY);
    var points2 = getEllipsePoints(x,y,radiusX2,radiusY,true);
    var pathStr = getLineParam(points.concat(points2));
    paper.setStart();
    var el = paper.path(pathStr);
    points = [{
      x:x,
      y:y+radiusY
    },{
      x:x,
      y:y-radiusY
    }];
    pathStr = getLineParam(points);
    var lineYEl = paper.path(pathStr);
    points = [{
      x:x+radiusX1,
      y:y
    },{
      x:x-radiusX2,
      y:y
    }];
    pathStr = getLineParam(points);
    var lineXEl = paper.path(pathStr);
    if(mode==='line'){
      el.attr('stroke-width',lineWidth);
      el.attr('stroke',color);
      lineXEl.attr('stroke-width',lineWidth);
      lineXEl.attr('stroke',color);
      lineXEl.attr('stroke-dasharray','-');
      lineYEl.attr('stroke-width',lineWidth);
      lineYEl.attr('stroke',color);
      lineYEl.attr('stroke-dasharray','-');
    }
    if(rotate){
      el.rotate(rotate,x-radiusX2,y);
      lineXEl.rotate(rotate,x-radiusX2,y);
      lineYEl.rotate(rotate,x-radiusX2,y);
    }
    this.simSet = paper.setFinish();
  };
  // 测距功能
  Simulation.prototype.distanceMeasurement = function(cb) {
    var paper = this.paper;
    var container = this.container;
    paper.setStart();
    this.measureHintSet = paper.setFinish();
    paper.setStart();
    this.measureSet = paper.setFinish();
    container.addEventListener('mousedown',this.onMouseDownHandler);
    container.addEventListener('mousemove',this.onMouseMoveHandler);
    this.measureCallback = cb;
  };
  Simulation.prototype.enableMeasurement = function(){
    this.measureEnabled = true;
  };
  Simulation.prototype.disableMeasurement = function(){
    this.measureEnabled = false;
  }
  // 获取当前屏幕点在svg的坐标
  Simulation.prototype.getCurPositon = function(clientX, clientY) {
    var rect = this.container.getBoundingClientRect();
    var x = clientX - rect.left;
    var y = clientY - rect.top;
    var panzoomInst = this.paper.panzoomInst;
    var trueX,trueY;
    if (panzoomInst) {
      let svgPoint = panzoomInst.getSvgPoint(x, y);
      trueX = svgPoint.x;
      trueY = svgPoint.y;
    } else {
        trueX = x;
        trueY = y;
    }
    return {
      x:trueX,
      y:trueY
    }
  };
  Simulation.prototype.removeSimSet = function(){
    this.simSet.forEach(function(el){
      el.remove();
    });
    this.simSet.clear();
  };
  Simulation.prototype.removeMeasureHintSet = function(){
    this.measureHintSet.forEach(function(el){
      el.remove();
    });
    this.measureHintSet.clear();
  };
  Simulation.prototype.removeMeasureSet = function(){
    this.measureSet.forEach(function(el){
      el.remove();
    });
    this.measureSet.clear();
  };
  Simulation.prototype.clearCacheElement = function() {
    if (this.cacheElement) {
        // 清除缓存元素
        this.cacheElement.remove();
    }
  };
  Simulation.prototype.clearCachePoints = function() {
    this.cachePoints = [];
  };
  Simulation.prototype.drawHint = function(point){
    this.removeMeasureHintSet();
    var hintStr = '左击确定起点，右击取消';
    if(this.measureStarted){
      hintStr = '左击确定终点，右击取消'
    }
    var circleEl = paper.circle(point.x,point.y,3);
    circleEl.attr('stroke','#f00');
    var rectEl = paper.rect(point.x + 5 ,point.y+10,160,20);
    rectEl.attr('stroke','#f00');
    rectEl.attr('stroke-width',2);
    var textEl = paper.text(point.x + 5 + 160/2,point.y+10+ 20/2,hintStr);
    textEl.attr('font-size',14);
    this.measureHintSet.push(circleEl);
    this.measureHintSet.push(rectEl);
    this.measureHintSet.push(textEl);
  };
  Simulation.prototype.drawCacheLine = function(points){
    this.clearCacheElement();
    if(points.length === 0 || points.length > 2){
      return;
    }
    var circleEl = this.paper.circle(points[0].x,points[0].y,3);
    circleEl.attr('stroke','#f00');
    this.measureSet.push(circleEl);
    var pathStr = getLineParam(points);
    this.cacheElement = this.paper.path(pathStr);
    this.cacheElement.attr('stroke','#f00');
    this.cacheElement.attr('stroke-width',2);
  };
  Simulation.prototype.drawLine = function(points){
    if(points.length !== 2){
      return;
    }
    
    this.clearCacheElement();
    this.clearCachePoints();
    var pathStr = getLineParam(points);
    var pathEl = this.paper.path(pathStr);
    pathEl.attr('stroke','#f00');
    pathEl.attr('stroke-width',2);
    var circleEl = this.paper.circle(points[1].x,points[1].y,3);
    circleEl.attr('stroke','#f00');
    this.measureSet.push(pathEl);
    this.measureSet.push(circleEl);
    this.measureStarted = false;
  };
  Simulation.prototype.onContextmenu = function(){
    
  }
  Simulation.prototype.onMouseDown = function(e){
    console.log(e.button)
    if(!this.measureEnabled){
      return;
    }
    this.measureStarted = true;
    var point = this.getCurPositon(e.clientX,e.clientY);
    this.cachePoints.push(point);
    if(this.cachePoints.length === 2){
      this.drawLine(this.cachePoints);
    }else {
      this.drawCacheLine(this.cachePoints);
    }
  };
  Simulation.prototype.onMouseMove = function(e){
    if(!this.measureEnabled){
      return;
    }
    this.drawHint({
      x:e.clientX,
      y:e.clientY
    });
    if (this.cachePoints.length === 0) {
      return;
    }
  
    var point = this.getCurPositon(e.clientX, e.clientY);
    var points = [].concat(this.cachePoints);
    points.push(point);
    console.log(points);
    this.drawCacheLine(points);
  };
  Simulation.prototype.destroy = function() {
    this.removeSimSet();
    this.removeMeasureSet();
    this.removeMeasureHintSet();
    container.removeEventListener('mousedown',this.onMouseDownHandler);
    container.removeEventListener('mousemove',this.onMouseMoveHandler);
  };

  R.fn.simulation = function() {
    var paper = this;
    return new Simulation(paper);
  };
})(Raphael);
