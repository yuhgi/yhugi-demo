(function(R) {
  function Simulation(paper) {
    this.paper = paper;
    this.rotateDeg = 30;
    this.opacity = 0.5;
    this.fontSize = 12;
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

  // 同心圆绘制
  Simulation.prototype.concentricCircle = function(opt) {
    var paper = this.paper;
    var mode = opt.mode;
    var rotateDeg = this.rotateDeg;
    var opacity = this.opacity;
    var fontSize = this.fontSize;
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
      textEl = paper.text(x+temp.radius/2,y,temp.text);
      if (mode === "fill") {
        circleEl.attr("fill", temp.color);
        circleEl.attr("stroke-width", 0);
        circleEl.attr("opacity", opacity);
        
      } else {
        circleEl.attr("stroke-width", 1);
        circleEl.attr("stroke", temp.color);
      }
      lineEl.rotate(-i*rotateDeg,x,y);
      lineEl.attr('stroke',temp.color);

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
    var mode = opt.mode;
    var opacity = this.opacity;
    var color = '#f00';
    var x = opt.x;
    var y = opt.y;
    var circleList = opt.circleList;
    var i, len, temp, circleEl;
    for (i=0, len = circleList.length; i < len; i++) {
        temp = circleList[i];
        circleEl = paper.circle(x + temp.x, y, temp.radius);

        if (mode === "fill") {
          circleEl.attr("fill", color);
          circleEl.attr("stroke-width", 0);
          circleEl.attr("opacity", opacity);
          
        } else {
          circleEl.attr("stroke-width", 1);
          circleEl.attr("stroke", color);
        }
      }
  };
  // 不规则椭圆绘制
  Simulation.prototype.IrregularCircle = function() {
    var paper = this;
  };
  // 测距功能
  Simulation.prototype.distanceMeasurement = function() {
    var paper = this;
  };
  Simulation.prototype.destroy = function() {
    this.simSet.clear();
  };

  R.fn.simulation = function() {
    var paper = this;
    return new Simulation(paper);
  };
})(Raphael);
