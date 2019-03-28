(function(R) {
    R.el.draggable = function(move, start, end) {
        this._draggable = this._draggable || {};
        this._draggable.dragging = true;
        var that = this;

        this._draggable.onMove = R.is(move, 'function')
            ? move
            : function(distanceX, distanceY, x, y) {
                  that.translate(distanceX, distanceY);
              };

        this._draggable.onStart = R.is(start, 'function')
            ? start
            : function(x, y) {};

        function onMove(dx, dy, x, y,e) {
            e.stopPropagation();
            if(that._draggable.dragging === false){
                return;
            }
            var panzoom = that.paper.panzoom;
            var distanceX = dx - that._draggable.lastDx;
            var distanceY = dy - that._draggable.lastDy;
            that._draggable.lastDx = dx;
            that._draggable.lastDy = dy;
            if(panzoom){
                if(panzoom.curZoomLevel > 0){
                    distanceX = distanceX * (panzoom.curZoomLevel * panzoom.zoomStep);
                    distanceY = distanceY * (panzoom.curZoomLevel * panzoom.zoomStep);
                }else if(panzoom.curZoomLevel < 0){
                    distanceX = distanceX / Math.abs(panzoom.curZoomLevel * panzoom.zoomStep);
                    distanceY = distanceY / Math.abs(panzoom.curZoomLevel * panzoom.zoomStep);
                }
            }
            that._draggable.onMove(distanceX, distanceY, x, y);
            // that.paper.safari();
            
        }

        function onStart(x, y, e) {
            e.stopPropagation();
            if(e.button == 2){
                // 右键不可拖动
                that._draggable.dragging = false;
                return;
            }
            that._draggable.dragging = true;

            that._draggable.lastDx = 0;
            that._draggable.lastDy = 0;
            that._draggable.onStart(x, y);
        }

        function onEnd(e) {
            e.stopPropagation();
            if(that._draggable.dragging === false){
                return;
            }
            R.is(end, 'function') && end(that._draggable.lastDx, that._draggable.lastDy);
        }

        return this.drag(onMove, onStart, onEnd);
    };
})(Raphael);
