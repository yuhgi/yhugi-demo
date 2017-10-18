;(function(){
    function MyModule(){

    }
    var moduleName = MyModule;
    if(typeof module !== 'undefined' && typeof module.exports === 'object'){ // commonjs
        module.exports = moduleName;
    }else if(typeof define === 'function' && (define.amd || define.cmd)){ // amd, cmd
        define(function(){
            return moduleName;
        });
    }else {
        this.moduleName = moduleName;
    }
}).call(function(){
    return this || (typeof window !== 'undefined' ? window : global);
});