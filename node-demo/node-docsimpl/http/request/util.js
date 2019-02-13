'use strict';

// shallow copy
var extend = function(source,target){
    var i,len;
    if(!target || typeof target !== 'object'){
        return source;
    }
    var keys = Object.keys(target);
    for(i=0,len=keys.length;i<len;i++){
        source[keys[i]] = target[keys[i]];
    }
    return source;
};

var isObject = function(obj){
    return obj!==null && obj!=='undefined' && typeof obj === 'object'; 
};
var isArray = function(arr){
    return Array.isArray || arr instanceof Array;
};

var extendDeep = function(source,target,deep){
    var i,len,keys,key;
    if(!isObject(target) && !isArray(target)){
        return source;
    }
    if(isObject(target)) { keys = Object.keys(target);}
    if(isArray(target)) { keys = target;}
    for(i=0,len = keys.length;i<len;i++){
        key = keys[i];
        if(deep && (isObject(target[key]) || isArray(target[key]))){
            if(isObject(target[key]) && !isObject(source[key])){
                source[key] = {};
            }
            if(isArray(target[key]) && !isArray(source[key])){
                source[key] = [];
            }
            extendDeep(source[key],target[key]);
        }else if(target[key] !== 'undefined'){
            source[key] = target[key];
        }
    }
    return source;
};

module.exports = {
    extend:extendDeep
};
