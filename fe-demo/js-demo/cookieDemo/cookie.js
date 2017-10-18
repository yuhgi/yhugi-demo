var document = window.document,
    encodeURIComponent = window.encodeURIComponent,
    decodeURIComponent = window.decodeURIComponent;

/**
 * 设置cookie，如果cookie已存在，那么修改其value；如果cookie不存在，那么添加到cookies中
 * @param key cookie的键
 * @param value cookie的值
 */
function setCookie(key,value){
  document.cookie = key + "=" + encodeURIComponent(value);
}

/**
 * 获取cookie
 * @param key cookie的键
 * @return 返回cookie的值。如果不存在，则返回null
 */
function getCookie(key){
  var reg = new RegExp("(^| )"+key+"=([^;]*)(;|$)"),
      arr = document.cookie.match(reg);
  if(arr){
    return decodeURIComponent(arr[2]);
  }else{
    return null;
  }
}
/**
 * 删除cookie
 * @param key cookie的键
 */
function deleteCookie(key){
  var expire = new Date(),
      value = getCookie(key);
  expire.setTime(expire.getTime()-1);
  if(value){
    document.cookie =key+"="+value+";path=/;expires="+expire.toGMTString();
  }
}