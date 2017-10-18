var BMap = window.BMap;
var document = window.document;

var ICON_MAP = {
    "online": 'images/ic_locate/ic_locate_online.png',// 在线
    "onlineActive": 'images/ic_locate/ic_locate_online_s.png',// 在线,点击显示详细信息
    "calling": 'images/ic_locate/ic_locate_calling.png',// 呼叫中
    "callingActive": 'images/ic_locate/ic_locate_calling_s.png',// 呼叫中,点击显示详细信息
    "offline": 'images/ic_locate/ic_locate_offline.png',// 离线
    "offlineActive": 'images/ic_locate/ic_locate_offline_s.png',// 离线，点击显示详细信息
    "emergencyAlarm": 'images/ic_locate/ic_locate_emergencyalarm.gif',// 紧急告警
    "crossBorderAlarm": 'images/ic_locate/ic_locate_crossborderalarm.gif',// 越界告警
    "offlineAlarm": 'images/ic_locate/ic_locate_offlinealarm.gif',// 离线告警
    "stillAlarm": 'images/ic_locate/ic_locate_stillalarm.gif'// 静止不动告警
};

var COLOR_MAP = {
    "online":"#176AAD",
    "offline":"#AFB1B3",
    "calling":"#F39800",
    "emergencyAlarm":"#E52233",
    "crossBorderAlarm":"#FFF100",
    "offlineAlarm":"#AFB1B3",
    "stillAlarm":"#7ECEF4"
};

var extend = function(target,source){
    var i,len,key,keys;
    if(!source || typeof source !== 'object'){
        return target;
    }
    if(!target || typeof target !== 'object'){
        target = {};
    }
    keys = Object.keys(source);
    for(i=0,len=keys.length;i<len;i++){
        key = keys[i];
        target[key] = source[key];
    }
    return target;
};

var UserMarker = function(point,options){
    if(!point instanceof BMap.Point){
        throw new TypeError('TypeError:point should be an instance of BMap.Point');
    }
    if(typeof options !== 'object'){
        options = {};
    }
    this._point = point;
    this._options = {};
    extend(this._options,this.defaultOptions);
    extend(this._options,options);
};

UserMarker.prototype = new BMap.Overlay();

UserMarker.prototype.defaultOptions = {
    id:'',
    name:"用户",// 用户名
    address:'',// 地址
    telNumber:'',// 电话号码
    speed:'',// 速度
    time:'',// 时间
    width:'34',
    height:'42',
    state:'online',
    labelWidth:'130',
    labelOffsetX:'',
    labelOffsetY:''
};

UserMarker.prototype.initialize = function(map){
    this._map = map;
    var markerEl = document.createElement('div');
    markerEl.className = 'mcptt-usermarker';
    markerEl.style.position = 'absolute';
    markerEl.style.width = this._options.width + 'px';
    markerEl.style.height = this._options.height + 'px';
    markerEl.style.backgroundColor = "rgba(255,255,255,0)";
    markerEl.style.padding = '0';
    markerEl.style.margin = '0';
    // 图标
    var iconEl = document.createElement('img');
    var state = this._options.state;
    iconEl.src = ICON_MAP[state] || ICON_MAP["online"];
    markerEl.appendChild(iconEl);

    // 名称
    var nameEl = document.createElement('div');
    nameEl.className = "mcptt-usermarker-name";
    nameEl.textContent = this._options.name||'';
    markerEl.appendChild(nameEl);

    // 详细信息
    var labelEl = document.createElement('div');
    labelEl.className = "mt-usermarker-label";
    labelEl.style.width = this._options.labelWidth + 'px';
    labelEl.style.height = this._options.labelHeight + 'px';
    labelEl.style.position = 'absolute';
    labelEl.style.display = 'none';
    labelEl.style.bottom = this._options.height + 'px';
    labelEl.style.left = "10px";

    var labelHeaderEl = document.createElement('div');
    labelHeaderEl.className = 'mt-usermarker-label-header';
    var labelHeaderNameEl = document.createElement('span');
    labelHeaderNameEl.className = 'header-name';
    labelHeaderNameEl.textContent = this._options.name||'';
    var labelHeaderAlarmEl = document.createElement('span');
    labelHeaderAlarmEl.className = 'header-alarm';
    var labelHeaderCloseEl = document.createElement('span');
    labelHeaderCloseEl.className = 'header-close';
    labelHeaderEl.appendChild(labelHeaderNameEl);
    labelHeaderEl.appendChild(labelHeaderAlarmEl);
    labelHeaderEl.appendChild(labelHeaderCloseEl);

    var labelBodyEl = document.createElement('div');
    labelBodyEl.className = 'mt-usermarker-label-body';
    var labelBodyAddressEl = document.createElement('div');
    labelBodyAddressEl.className = 'body-address';
    labelBodyAddressEl.textContent = this._options.address||'暂无位置信息';
    var labelBodyTimeEl = document.createElement('div');
    labelBodyTimeEl.className = 'body-time';
    labelBodyTimeEl.textContent = this._options.time||'';
    var labelBodySpeedEl = document.createElement('div');
    labelBodySpeedEl.className = 'body-speed';
    labelBodySpeedEl.textContent = this._options.speed||'';
    labelBodyEl.appendChild(labelBodyAddressEl);
    labelBodyEl.appendChild(labelBodySpeedEl);
    labelBodyEl.appendChild(labelBodyTimeEl);

    var labelFooterEl = document.createElement('div');
    labelFooterEl.className = 'mt-usermarker-label-footer';
    var callBtn = document.createElement('button');
    callBtn.className = "call-btn";
    callBtn.textContent = "呼叫";
    var locateBtn = document.createElement('button');
    locateBtn.className = "cancellocate-btn";
    locateBtn.textContent = "取消定位";
    labelFooterEl.appendChild(callBtn);
    labelFooterEl.appendChild(locateBtn);

    labelEl.appendChild(labelHeaderEl);
    labelEl.appendChild(labelBodyEl);
    labelEl.appendChild(labelFooterEl);
    markerEl.insertBefore(labelEl,iconEl);

    markerEl.addEventListener('click',this._markerElClickHandler.bind(this));
    markerEl.addEventListener('dblclick',this._markerElDblClickHandler.bind(this));

    this._events = {};// 事件容器
    this._id = this._options.id; // 外部传入的id
    this._labelActive = false; // label是否处于active状态（显示为true，否则为false）
    this._state = state;// 状态
    // 将markerEl添加到覆盖物容器中
    this._map.getPanes().markerPane.appendChild(markerEl);
    this._markerEl = markerEl; 
    this._iconEl = iconEl;
    this._nameEl = nameEl;
    this._labelEl = labelEl;
    this._labelHeaderEl = labelHeaderEl;
    this._labelHeaderNameEl = labelHeaderNameEl;
    this._labelheaderAlarmEl = labelHeaderAlarmEl;
    this._labelBodyAddressEl = labelBodyAddressEl;
    this._labelBodySpeedEl = labelBodySpeedEl;
    this._labelBodyTimeEl = labelBodyTimeEl;
    this.setState(state);
    return markerEl;
};

UserMarker.prototype.draw = function(){
    var position = this._map.pointToOverlayPixel(this._point);
    this._markerEl.style.left = position.x - this._options.width/2 +'px';
    this._markerEl.style.top = position.y - this._options.height/2 + 'px';
};

UserMarker.prototype.show = function(){
    if(!this._markerEl){return;}
    this._markerEl.style.display = '';
};

UserMarker.prototype.hide = function(){
    if(!this._markerEl){return;}
    this._markerEl.style.display = 'none';
};

UserMarker.prototype.toggle = function(){
    if(!this._markerEl){return;}
    if(this._markerEl.style.display === ''){
        this._markerEl.style.display = 'none';
    }else if(this._markerEl.style.display === 'none'){
        this._markerEl.style.display = '';
    }
};

UserMarker.prototype._markerElClickHandler = function(e){
    this.toggleLabel();
    e.stopPropagation();
    e.preventDefault();
    return false;
};

UserMarker.prototype._markerElDblClickHandler = function(e){
    e.stopPropagation();
    e.preventDefault();
    return false;
};

UserMarker.prototype.showLabel = function(){
    if(!this._labelEl){return;}
    this._iconEl.src = ICON_MAP[this._state+'Active'] || 
        ICON_MAP[this._state] || ICON_MAP['onlineActive'];
    this._labelEl.style.display = '';
    this._labelActive = true;
};

UserMarker.prototype.hideLabel = function(){
    if(!this._labelEl){return;}
    this._iconEl.src = ICON_MAP[this._state] || ICON_MAP['online'];
    this._labelEl.style.display = 'none';
    this._labelActive = false;
};

UserMarker.prototype.toggleLabel = function(){
    if(!this._labelEl){return;}
    if(this._labelEl.style.display === ''){
        this.hideLabel();
    }else if(this._labelEl.style.display === 'none'){
        this.showLabel();
    }
};

UserMarker.prototype.setState = function(state){
    if(!COLOR_MAP.hasOwnProperty(state)){
        return;
    }
    this._state = state;
    if(this._labelActive){
        this._iconEl.src = ICON_MAP[this._state+'Active'] || 
            ICON_MAP[this._state] || ICON_MAP['onlineActive'];
    }else{
        this._iconEl.src = ICON_MAP[this._state] || ICON_MAP['online'];
    }
    this._labelHeaderEl.style.backgroundColor = COLOR_MAP[state];
};

UserMarker.prototype.setName = function(name){
    if(typeof name !== 'string'){return;}
    if(!this._labelHeaderNameEl){return;}
    this._labelHeaderNameEl.textContent = name;
};

UserMarker.prototype.setAddress = function(address){
    if(typeof name !== 'string'){return;}
    if(!this._labelBodyAddressEl){return;}
    this._labelBodyAddressEl.textContent = address||'暂无位置信息';
};

UserMarker.prototype.setTime = function(time){
    if(typeof time !== 'string'){return;}
    if(!this._labelBodyTimeEl){return;}
    this._labelBodyTimeEl.textContent = time;
};
UserMarker.prototype.setSpeed = function(speed){
    if(typeof speed !== 'string'){return;}
    if(!this._labelBodySpeedEl){return;}
    this._labelBodySpeedEl.textContent = speed;
};
UserMarker.prototype.setPoint = function(point){
    if(!point){return;}
    if(!point instanceof BMap.Point){return;}
    this._point = point;
    this.draw();
};

UserMarker.prototype.getId = function(){
    return this._id;
};

UserMarker.prototype.setId = function(id){
    this._id = id;
};

UserMarker.prototype.addEventListener = function(eventName,handler){
    var that = this;
    var eventHandler = function(e){
        if(e.target.className === 'header-close'){
            that.hideLabel();
        }
        if(e.target.className === 'call-btn' || e.target.className === 'cancellocate-btn'){
            handler && handler(e,that._id);
        }
        e.stopPropagation();
    };
    if(!this._events[eventName]){
        this._events[eventName] = [];
    }
    this._events[eventName].push(eventHandler);
    this._labelEl.addEventListener(eventName,eventHandler);
};

UserMarker.prototype.dispose = function(){
    var i,len,j,key,keys,handlers;
    // 清空UserMarker上挂载的事件(通过labelEl代理)
    keys = Object.keys(this._events);
    for(i=0,len=keys.length;i<len;i++){
        key = keys[i];
        handlers = this._events[key];
        for(j=0;j<handlers.length;j++){
            this._labelEl.removeEventListener(key,handlers[j]);
        }
        delete this._events[key];
    }
    // 清空markerEl上挂载的事件
    this._markerEl.removeEventListener('click',this._markerElClickHandler);
    this._markerEl.removeEventListener('dblclick',this._markerElDblClickHandler);
};





