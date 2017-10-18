var document = window.document;
jsPlumb.ready(function(){
  var jsPlumbInstance = jsPlumb.getInstance({
    DragOptions:{cursor:'pointer',zIndex:2000},
    ConnectionOverlays:[
      ['Arrow',{location:1}],
      ['Label',{
        location:0.1,
        id:'label',
        cssClass:'aLabel'
      }]
    ],
    //Container:'drop-scope'
  });
  registerTypes(jsPlumbInstance);
  initDragArea(jsPlumbInstance);
  registerEvents(jsPlumbInstance);
});


function registerTypes(jsPlumbInstance){
  jsPlumbInstance.registerEndpointTypes({
    'basic':{
      endpoint:['Dot',{radius:5}],
      paintStyle:{//连接点的样式
        strokeStyle:'#7AB02C',
        fillStyle:'transparent',//连接点中心透明
        radius:5,
        lineWidth:2
      },
      hoverPaintStyle:{//连接点hover状态样式
        fillStyle: '#216477',
        strokeStyle: '#216477'
      }
    }
  });

  jsPlumbInstance.registerConnectionTypes({
    'basic':{
      stub: [40, 60],
      gap: 10,
      cornerRadius: 5,
      alwaysRespectStubs: true,
      paintStyle:{
        lineWidth:4,
        strokeStyle:'#61B7CF',
        joinstyle:'round',
        outlineColor:'white',
        outlineWidth:2
      },//连接线的样式
      hoverPaintStyle:{
        lineWidth: 4,
        strokeStyle: '#216477',
        outlineWidth: 2,
        outlineColor: 'white'
      }//连接线hover状态样式
    },
    'selected':{
      connector: 'Flowchart',
      paintStyle: { strokeStyle: '#216477', lineWidth: 4 },
      hoverPaintStyle: { strokeStyle: '#216477' },
      cssClass:'connector-selected'
    }
  });
}

//各种类型元素的index
var ELEMENT_INDEX = {
  'start-elem':0,
  'judge-elem':0,
  'process-elem':0,
  'end-elem':0
};

function initDragArea(jsPlumbInstance){
  jsPlumbInstance.draggable(document.getElementsByClassName('drag-elem'),{
    clone:true,
    scope:'dragScope'
  });
  console.log(document.getElementsByClassName('drop-scope')[0]);
  var droppableElement = document.getElementsByClassName('drop-scope')[0];
  jsPlumbInstance.droppable(droppableElement,{
    scope:'dragScope',
    drop:function(param){
      console.log(param.e.target);
      var target = param.e.target;

      //对于旋转的元素，快速拖动可能会导致mouseup的target为div.drop-scope
      if(param.e.target.className.indexOf('drop-scope')>-1 ){
        return;
      }
      //在拖动判断框的时候，有可能导致target为span
      if(param.e.target.nodeName.toLowerCase() === 'span'){
        target = param.e.target.parentNode;
      }
      var dropElement = target.cloneNode(true);
      var dropRect = param.drop.el.getBoundingClientRect();
      var dargRect = target.getBoundingClientRect();
      var left = dargRect.left - dropRect.left;//加上border的宽度
      var top = dargRect.top - dropRect.top ;//加上border的宽度
      dropElement.id = param.drag.el.id + '-' + ELEMENT_INDEX[param.drag.el.id]++;
      dropElement.style.top = top+'px';
      dropElement.style.left = left+'px';
      droppableElement.appendChild(dropElement);
      ['TopCenter','RightMiddle','BottomCenter','LeftMiddle'].forEach(function(anchor){
        jsPlumbInstance.addEndpoint(dropElement,{
          anchor:anchor,
          isTarget:true,
          isSource:true,
          connector:['Flowchart',{
            stub: [40, 60],
            gap: 10,
            cornerRadius: 5,
            alwaysRespectStubs: true
          }],
          type:'basic',
          connectionType:'basic',
          maxConnections:-1
        });
      });
      jsPlumbInstance.draggable(dropElement,{
        containment:droppableElement,
        scope:'dragscope'
      });
    }
  });
}

function registerEvents(jsPlumbInstance){
  jsPlumbInstance.bind('click', function (conn, originalEvent) {
    debugger
    if(confirm("Delete connection from " +
      conn.sourceId + " to " + conn.targetId + "?")){
      jsPlumbInstance.detach(conn);
    }
    //conn.toggleType('selected');
  });
}