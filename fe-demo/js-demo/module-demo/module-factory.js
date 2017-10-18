var moduleName = '$';

;function(factory){
    if(typeof require==='function' && typeof exports === 'object' &&
        typeof module === 'object'){
        var target = module['exports'] || exports;
        factory(target);
    }else if(typeof define === 'function' && define['amd']){
        define(['exports'], factory);
    }else{
        factory(window || global);
    }
}(function(exp){
    var exports = typeof exp !== 'undefined' ? exp : {};
    exports[moduleName] = function(){
        // ...
    }
})