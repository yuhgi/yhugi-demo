define(function(){
    var EventBus = function(){
        this.events = {};
    };

    EventBus.prototype.fire = function(event){
        var args = Array.prototype.slice.call(arguments, 1);
        if(!this.events[event]) {
            throw new Error("event :" + event + ": is not listening");
        }
        this.events[event].forEach(function(callback){
            callback.apply(callback, args);
        });
    };

    EventBus.prototype.on = function(event, callback){
        if(!this.events[event]){
            this.events[event] = [];
        }
        this.events[event].push(callback);
    };

    EventBus.prototype.off = function(event, callback){
        var funcArr = this.events[event],
            len = funcArr.length,
            i;
        // event is not mount
        if(!funcArr || len === 0){
            return;
        }
        for(i = 0; i < len; i++){
            if(funcArr[i] === callback){
                funcArr.splice(i, 1);
            }
        }
    };

    return EventBus;
});
