import {applyIf} from './copy';

/**
 * 将data序列化为表单格式（x-www-form-urlencoded）
 * @param {Object} data
 * @return {String} 序列化后的字符串
 */
function params(data){
    if(typeof data !== 'object'){
        throw new Error('Option \'data\' must be Object');
    }
    var arr = [];
    for(let i in data){
        if(data.hasOwnProperty(i)){
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
    }
    return arr.join('&');
}

const defaultOptions = {
    url:'',
    method:'GET',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/x-www-form-urlencoded'
    },
    data:null,
    async:true
};

export function ajax(options){
    var opts = applyIf(options,defaultOptions,true);
    return new Promise((resolve,reject) => {
        if(!window.XMLHttpRequest){
            throw new Error('Browser does not support XMLHttpRequest!');
        }
        var xhr = new XMLHttpRequest();
        var callback = function(){
            if(xhr.status === 200 || xhr.status === 304){
                let result = JSON.parse(xhr.responseText);
                if(result.errCode === 0){
                    resolve(result.data);
                }else{
                    reject(result.errMsg);
                }
                
            }else{
                reject(xhr.statusText);
            }
        };
        
        opts.method = String(opts.method).toUpperCase();
        if(opts.method === 'GET'){
            opts.url = opts.url.indexOf('?') === -1 ? '?' + params(opts.data) : '&' + opts.data;
        }
        if(opts.async === true){
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    callback();
                }
            };
        }
        if(opts.headers['Content-Type'].toLowerCase() === 'application/x-www-form-urlencoded'){
            opts.data = params(opts.data);
        }else if(opts.headers['Content-Type'].toLowerCase() === 'application/json' || 
            opts.headers['Content-Type'] === 'text/json'){
            opts.data = JSON.stringify(opts.data);
        }

        xhr.open(opts.method,opts.url,opts.async);
        for(let prop in opts.headers){
            if(opts.headers.hasOwnProperty(prop)){
                xhr.setRequestHeader(prop,opts.headers[prop]);
            }
        }
        if(opts.method === 'POST' || opts.method === 'PUT'){
            xhr.send(opts.data);
        }else{
            xhr.send(null);
        }
        if(opts.async === false){
            callback();
        }
    });
}

export function postJSON(options){
    options.method = 'POST';
    options.headers = options.headers || {};
    options.headers['Content-Type'] = 'application/json';
    return ajax(options);
}
