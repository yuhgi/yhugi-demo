(function(R) {
    function PanZoom(paper,options){
        var _that = this;
        this.paper = paper;
        this.container = paper.canvas.parentNode;
        this.containerRect = this.container.getBoundingClientRect();
        this.dragging = false; // 画布是否处于拖拽状态
        this.curZoomLevel = options.curZoomLevel; // 当前放缩等级
        this.minZoomLevel = options.minZoomLevel;
        this.maxZoomLevel = options.maxZoomLevel;
        this.zoomStep = options.zoomStep;
        this.curSvgOffsetX = options.curSvgOffsetX;
        this.curSvgOffsetY = options.curSvgOffsetY;
        this.limitWidth = options.limitWidth;
        this.limitHeight = options.limitHeight;
        this.enabled = true; // 是否允许zoom
        
        var container = this.container;
        var {width,height} = this.containerRect;
        this.paper.setSize(width, height);
        
        mouseWheelEvt = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel';
        // 监听滚轮事件
        if (container.addEventListener) {
            container.addEventListener(mouseWheelEvt, this.onScroll.bind(this), false);
        } else if (container.attachEvent) {
            container.attachEvent('on' + mouseWheelEvt, this.onScroll.bind(this));
        }
        container.onmousedown = this.onMouseDown.bind(this);
        container.onmousemove = this.onMouseMove.bind(this);
        container.onmouseup = this.onMouseUp.bind(this);
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
        var offsetX = this.draggingStartX - e.clientX;
        var offsetY = this.draggingStartY - e.clientY;

        var deltaX = offsetX - this.draggingOffsetX;
        var deltaY = offsetY - this.draggingOffsetY;

        let svgDeltaX,svgDeltaY;
        if(this.curZoomLevel > 0){
            svgDeltaX = deltaX * (this.curZoomLevel * this.zoomStep);
            svgDeltaY = deltaY * (this.curZoomLevel * this.zoomStep);
        }else if(this.curZoomLevel < 0){
            svgDeltaX = deltaX / Math.abs(this.curZoomLevel * this.zoomStep);
            svgDeltaY = deltaY / Math.abs(this.curZoomLevel * this.zoomStep);
        }else{
            svgDeltaX = deltaX;
            svgDeltaY = deltaY;
        }

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
    }

    PanZoom.prototype.repaint = function(){
        var paper = this.paper;
        var newWidth = paper.width;
        var newHeight = paper.height;
        var temp;
        if(this.curZoomLevel > 0){
            newWidth = paper.width * (this.curZoomLevel * this.zoomStep);
            newHeight = paper.height * (this.curZoomLevel * this.zoomStep);
        }else if(this.curZoomLevel < 0){
            newWidth = paper.width / Math.abs(this.curZoomLevel * this.zoomStep);
            newHeight = paper.height / Math.abs(this.curZoomLevel * this.zoomStep);
        }

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
        console.log(this.curSvgOffsetX, this.curSvgOffsetY,this.curZoomLevel,newWidth,newHeight);
        
        this.paper.setViewBox(this.curSvgOffsetX, this.curSvgOffsetY, newWidth, newHeight);
    }
    /**
     * @param {Number} offsetX 点到svg容器的横轴距离
     * @param {Number} offsetX 点到svg容器的竖轴距离
     */
    PanZoom.prototype.getSvgPoint = function(offsetX,offsetY){
        if(this.curZoomLevel > 0){
            offsetX = offsetX * (this.curZoomLevel * this.zoomStep);
            offsetY = offsetY * (this.curZoomLevel * this.zoomStep);
        }else if(this.curZoomLevel < 0){
            offsetX = offsetX / Math.abs(this.curZoomLevel * this.zoomStep);
            offsetY = offsetY / Math.abs(this.curZoomLevel * this.zoomStep);
        }
        
        var svgX = offsetX + this.curSvgOffsetX;
        var svgY = offsetY + this.curSvgOffsetY;
        return {
            x:svgX,y:svgY
        };
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
            zoomStep : 1.1,
            curZoomLevel:0,
            minZoomLevel:-6,
            maxZoomLevel:6,
            curSvgOffsetX:0,
            curSvgOffsetY:0,
        }
        extend(options,defaultOptions);
        
        var panzoom =  new PanZoom(paper,options);
        paper.panzoom = panzoom;
        return panzoom;
    };

})(Raphael);
