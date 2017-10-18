var class2type = {};

'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach((name) => {
    class2type['[Object '+name+']'] = name;
});

/**
 * 判断类型
 * @param {Any} obj
 * @return {String} 类型 
 */
var type = function(obj){
    return obj === null || obj === undefined ? String(obj):
        class2type[Object.prototype.toString.call(obj)] || 'object';
};

/**
 * 是否是对象(Object实例与null都属于对象)
 * @param {Any} obj
 * @return {Boolean}
 */
var isObject = function(obj){
    return typeof obj === 'object'; 
};
/**
 * 是否是简单对象(排除null)
 * @param {Any} obj
 * @return {Boolean}
 */
var isPlainObject = function(obj){
    return type(obj) === 'object' && Object.getPrototypeOf(obj) === Object.prototype;
};

var isFunction = function(func) { 
    return type(func) === 'function';
};

var isArray = Array.isArray || function(obj){
    return obj instanceof Array;
};

module.exports = {
    type:type,
    isObject:isObject,
    isPlainObject:isPlainObject,
    isArray:isArray,
    isFunction:isFunction
};