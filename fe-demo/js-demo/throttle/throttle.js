function throttle1(method,delay,context){
    clearTimeout(method.timerId);
    method.timerId = setTimeout(function(){
        method.call(context);
    },delay);
}

function throttle2(method,delay){
    var timerId = null;
    return function(){
        var context = this,args = arguments;
        clearTimeout(timerId);
        timerId = setTimeout(function(){
            method.apply(context,args);
        },delay);
    };
}

function throttle(method,delay,mustRunDelay){
    var timerId = null,startTime = new Date();
    return function(){
        var context = this,args = arguments,currentTime = new Date();
        if(currentTime - startTime>=mustRunDelay){
            method.apply(context,args);
            startTime = currentTime;
        }else{
            timerId = setTimeout(function(){
                method.apply(context,args);
            },delay);
        }
    };
}