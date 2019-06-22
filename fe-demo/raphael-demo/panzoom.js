(function(R) {
    function PanZoom(paper,options){
        var _that = this;
        this.paper = paper;
        this.container = paper.canvas.parentNode;
        this.containerRect = this.container.getBoundingClientRect();
        this.dragging = false; // 画布是否处于拖拽状态
        this.curZoomLevel = 0; // 当前放缩等级
        this.initScale = options.initScale; // 初始缩放比例
        this.minZoomLevel = options.minZoomLevel;
        this.maxZoomLevel = options.maxZoomLevel;
        this.zoomStep = options.zoomStep;
        this.curSvgOffsetX = options.curSvgOffsetX;
        this.curSvgOffsetY = options.curSvgOffsetY;
        this.limitWidth = options.limitWidth;
        this.limitHeight = options.limitHeight;
        this.enabled = true; // 是否允许zoom
        this.onZoom = options.onZoom;
        
        var container = this.container;
        var {width,height} = this.containerRect;
        this.paper.setSize(width, height);

        this.onScrollHandler = this.onScroll.bind(this);
        this.onMouseDownHandler = this.onMouseDown.bind(this);
        this.onMouseMoveHandler = this.onMouseMove.bind(this);
        this.onMouseUpHandler = this.onMouseUp.bind(this);
        
        mouseWheelEvt = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel';
        // 监听滚轮事件
        if (container.addEventListener) {
            container.addEventListener(mouseWheelEvt, this.onScrollHandler, false);
        } else if (container.attachEvent) {
            container.attachEvent('on' + mouseWheelEvt, this.onScrollHandler);
        }
        
        container.addEventListener('mousedown',this.onMouseDownHandler);
        container.addEventListener('mousemove', this.onMouseMoveHandler);
        window.addEventListener('mouseup',this.onMouseUpHandler);
        this.repaint();
        this.noticeZoom();
    }

    PanZoom.prototype.onMouseDown = function(e){
        this.dragging = true;
        this.draggingStartX = e.clientX;
        this.draggingStartY = e.clientY;
        this.draggingOffsetX = 0;
        this.draggingOffsetY = 0;
    }

    PanZoom.prototype.onMouseMove = function(e){
        if(!this.dragging){
            return false;
        }
        var scale = this.initScale;
        var offsetX = this.draggingStartX - e.clientX;
        var offsetY = this.draggingStartY - e.clientY;

        var deltaX = (offsetX - this.draggingOffsetX)/scale;
        var deltaY = (offsetY - this.draggingOffsetY)/scale;

        var svgDeltaX = this.getSvgDistance(deltaX);
        var svgDeltaY = this.getSvgDistance(deltaY);

        this.curSvgOffsetX += svgDeltaX;
        this.curSvgOffsetY += svgDeltaY;

        this.draggingOffsetX = offsetX;
        this.draggingOffsetY = offsetY;

        this.repaint();
    }

    PanZoom.prototype.onMouseUp = function(e){
        this.dragging = false;
    }

    PanZoom.prototype.onScroll = function(e){
        var evt = window.event || e;
        var delta = evt.detail || evt.wheelDelta * -1;

        if(!this.enabled){
            return false;
        }
        if(delta > 0){
            delta = -1;
        }else if(delta < 0){
            delta = 1;
        }
        this.zoom(delta);
        if (evt.preventDefault) {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
        return false;
    }

    PanZoom.prototype.zoom = function(zoomDelta){
        if(!this.enabled){
            return false;
        }
        this.curZoomLevel += zoomDelta;
        if(this.curZoomLevel < this.minZoomLevel){
            this.curZoomLevel = this.minZoomLevel;
        }
        if(this.curZoomLevel > this.maxZoomLevel){
            this.curZoomLevel = this.maxZoomLevel;
        }
        
        var {width,height} = this.containerRect;
        this.paper.setSize(width, height);
        this.repaint();
        this.noticeZoom();
    }

    PanZoom.prototype.repaint = function(){
        var paper = this.paper;
        var scale = this.initScale;
        
        var temp;

        var newWidth = this.getSvgDistance(paper.width);
        var newHeight = this.getSvgDistance(paper.height);

        if(this.limitWidth){
            if(this.curSvgOffsetX < 0){
                this.curSvgOffsetX = 0;
            }else if(this.curSvgOffsetX > (temp = this.limitWidth - newWidth)){
                this.curSvgOffsetX = temp > 0 ? temp : 0;
            }
        }
        
        if(this.limitHeight){
            if(this.curSvgOffsetY < 0){
                this.curSvgOffsetY = 0;
            }else if(this.curSvgOffsetY > (temp = this.limitHeight - newHeight)){
                this.curSvgOffsetY = temp > 0 ? temp : 0;
            }
        }
        //console.log(this.curSvgOffsetX, this.curSvgOffsetY,this.curZoomLevel,newWidth,newHeight);
        
        this.paper.setViewBox(this.curSvgOffsetX, this.curSvgOffsetY, newWidth, newHeight);
    }
    /**
     * @param {Number} offsetX 点到svg容器的横轴距离
     * @param {Number} offsetY 点到svg容器的竖轴距离
     */
    PanZoom.prototype.getSvgPoint = function(offsetX,offsetY){
        var svgX = this.getSvgDistance(offsetX) + this.curSvgOffsetX;
        var svgY = this.getSvgDistance(offsetY) + this.curSvgOffsetY;
        return {
            x:svgX,y:svgY
        };
    }
    // 获取svg距离
    PanZoom.prototype.getSvgDistance = function(distance){
        var svgDistance;
        // var scale = this.initScale;
        var scale = this.getCurrentScale();
        svgDistance = distance/scale;

        // if(this.curZoomLevel > 0){
        //     svgDistance = svgDistance / (this.curZoomLevel * this.zoomStep);
        // }else if(this.curZoomLevel < 0){
        //     svgDistance = svgDistance * Math.abs(this.curZoomLevel * this.zoomStep);
        // }
        if(this.curZoomLevel > 0){
            svgDistance = svgDistance / Math.pow(this.zoomStep,this.curZoomLevel);
        }else if(this.curZoomLevel < 0){
            svgDistance = svgDistance * Math.pow(this.zoomStep,Math.abs(this.curZoomLevel));
        }
        return svgDistance;
    }
    // 获取当前缩放比例
    PanZoom.prototype.getCurrentScale = function(){
        var scale = this.initScale;
        if(this.curZoomLevel > 0){
            scale = scale * Math.pow(this.zoomStep,this.curZoomLevel);
        }else if(this.curZoomLevel < 0){
            scale = scale / Math.pow(this.zoomStep,Math.abs(this.curZoomLevel));
        }
        return scale;
    }

    PanZoom.prototype.noticeZoom = function(){
        var scale = this.getCurrentScale();
        this.onZoom && this.onZoom(scale);
    }

    PanZoom.prototype.destroy = function(){
        var container = this.container;
        container.onmousedown = null;
        container.onmousemove = null;
        container.onmouseup = null;
        var {width,height} = this.containerRect;
        this.paper.setViewBox(0,0,width, height);
        this.paper.panzoomInst = null;
    }

    function extend(target,src){
        if(typeof src == "object"&&typeof target=="object"){
            for(var key in src){
                if(src.hasOwnProperty(key)){
                    target[key] = src[key];
                }
            }
            return target;
        }
    };

    R.fn.panzoom = function(options){
        var paper = this;
        
        var defaultOptions = {
            limitWidth:600,
            limitHeight:800,
            initScale:1,
            zoomStep : 1.1,
            curZoomLevel:0,
            minZoomLevel:-10,
            maxZoomLevel:10,
            curSvgOffsetX:0,
            curSvgOffsetY:0,
        }
        extend(defaultOptions,options);
        
        var panzoomInst = new PanZoom(paper,defaultOptions);
        paper.panzoomInst = panzoomInst;
        return panzoomInst;
    };

})(Raphael);
