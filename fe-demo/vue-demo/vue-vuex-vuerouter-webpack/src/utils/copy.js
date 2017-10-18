var TypeUtils = require('./type.js');
var isPlainObject = TypeUtils.isPlainObject;
var isArray = TypeUtils.isArray;

export function clone(obj){
    if(!obj && 'object' !== typeof obj){
        return obj;
    }
    if(obj.clone && 'function' === typeof obj.clone){
        return obj.clone();
    }
    let c = isArray(obj) ? [] : {};
    for(let prop in obj){
        let val = obj[prop];
        if(val && 'object' === typeof val){
            c[prop] = clone(val);
        }else{
            c[prop] = val;
        }
    }
    return c;
}

export function apply(target,source,deep,copyExistProperty){
    var i,len,keys,key;
    if(!isPlainObject(source) && !isArray(source)){
        return target;
    }
    if(isPlainObject(source)) { keys = Object.keys(source);}
    if(isArray(source)) { keys = source;}
    for(i=0,len = keys.length;i<len;i++){
        key = keys[i];
        if(deep && (isPlainObject(source[key]) || isArray(source[key]))){
            if(isPlainObject(source[key]) && !isPlainObject(target[key])){
                target[key] = {};
            }
            if(isArray(source[key]) && !isArray(target[key])){
                target[key] = [];
            }
            apply(target[key],source[key]);
        }else if(source[key] !== 'undefined'){
            if(!copyExistProperty && target[key]) {continue;}
            target[key] = source[key];
        }
    }
    return target;
}

export function applyIf(target,source,deep){
    return apply(target,source,deep,false);
}