window.Utils = window.Utils || {};

(function(Utils) {





}(window.Utils));

window.racer || window.racer = {};

(function(racer){
    // 创建xhr对象
    function createXHR(){
        if (typeof XMLHttpRequest != 'undefined') {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != 'undefined') {
            var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'],
                i,
                len;
            for (i = 0, len = versions.length; i < len; i++) {
                try {
                    return new ActiveXObject(versions[i]);
                } catch (ex) {
                    throw new Error("create xhr error! check your browser!")
                }
            }
        } else {
            throw new Error('No XHR object available.');
        }
    }
    //在url后面添加查询字符串
    function addURLParam(url, name, value) {
        url += (url.indexOf('?') == -1 ? '?' : '&');
        url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
        return url;
    }
    // 对data序列化为x-www-urlencoded的字符串
    function serialize(data) {
        var parts = [];
        if (typeof data !== 'object') {
          data = {};
        }

        Object.keys(data).map(function(key) {
            parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        });

        return parts.join('&');
    }

    // 默认配置
    var defaultOptions = {
        method:'get', // http方法
        type:'json'
    }

    var MethodMap = {
        'get':'get',
        'post':'post',
        'put':'put',
        'delete':'delete'
    }

    function addHeaders(xhr,headers){
        for(var key in headers){
            if(headers.hasOwnproperty(key)){
                xhr.setRequestHeader(key,headers[key]);
            }
        }
    }

    function sendGet(xhr,url,data,headers,option){
        xhr.open('get', url, true);
        addHeaders(xhr,headers);
        for(var key in data){
            if(data.hasOwnproperty(key)){
                addURLParam(url,data[key])
            }
        }
        xhr.send(null);
    }

    function sendPost(xhr,url,data,headers,option){
        xhr.open('post', url, true);
        addHeaders(xhr,headers);
        if (option.type === 'plain') {
            xhr.setRequestHeader('Content-Type', 'text/plain');
            xhr.send(data.toString());
        }else if (option.type === 'json') {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(window.JSON.stringify(data));
        }else if (option.type === 'multipart') {
            xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            xhr.send(data);
        }else{
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(serialize(data));
        }
        xhr.send(null);
    }

    function sendPut(xhr,url,data,headers,option){
        throw new Error('unavailable now');
    }

    function sendDelete(xhr,url,data,headers,option){
        throw new Error('unavailable now');
    }
    racer.ajax = {};

    /*
     * @desc 向服务器发送数据, 发送application/x-www-form-urlencoded
     * @method http方法
     * @headers 请求头
     * @options 请求的配置项
     */
    racer.ajax.send = function(method,url,data,headers,options){
        if(typeof method !== 'string' || !MethodMap[method.toLowerCase()]){
            throw new Error("[method] should be get|post|put|delete");
        }
        if(typeof data !== 'object' && typeof data !== 'string'
            && !Array.isArray(data)){
            throw new Error("[data] should be Object|String|Array");
        }
        if(typeof headers !== 'object'){
            throw new Error("[headers] should be Object'");
        }
        var method = MethodMap[method];
        var xhr = createXHR();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304) {
                    option.success && option.success(xhr.responseText);
                } else if (xhr.status >= 400 && xhr.status < 500) {
                    option.fail && option.fail(xhr.responseText);
                } else {
                    option.error && option.error(xhr.responseText);
                }
            }
        };

        if (method === 'get') {
            sendGet(xhr,data,options);
        }else if(method === 'post'){
            sendPost(xhr,data,options);
        }else if(method === 'put'){
            sendPut(xhr,data,options);
        }else if(method === 'delete'){
            sendDelete(xhr,data,options);
        }
    }

    /*
     * @desc 向服务器发送数据, 发送application/json
     * @method http方法
     * @headers 请求头
     * @options 请求的配置项
     */
    racer.ajax.sendJSON = function(method,data,headers){
        racer.ajax.send(method,data,headers,{type:'json'});
    }

    /*
     * @desc 向服务器发送数据, 发送text/plain
     * @method http方法
     * @headers 请求头
     * @options 请求的配置项
     */
    racer.ajax.sendPlain = function(method,data,headers){
        racer.ajax.send(method,data,headers,{type:'plain'});
    }

    /*
     * @desc 向服务器发送数据, 发送multipart/form-data
     * @method http方法
     * @headers 请求头
     * @options 请求的配置项
     */
    racer.ajax.sendMultiart = function(method,data,headers){
        racer.ajax.send(method,data,headers,{type:'multipart'});
    }

})(window.racer);
