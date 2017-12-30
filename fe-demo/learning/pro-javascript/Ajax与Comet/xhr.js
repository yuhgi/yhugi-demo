
function createXHR(){
  if(typeof XMLHttpRequest != "undefined"){//IE 7+, Firefox, Safari, Chrome ,Opera
    return new XMLHttpRequest();
  }else if(typeof ActiveXObject != "undefined"){//IE 7以下
    if(typeof arguments.callee.activeXString != "string"){
      var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0",
                      "MSXML2.XMLHttp"],
          i,
          len;
      for(i=0,len = versions.length;i<len;i++){
        try{
          new ActiveXObject(versions[i]);
          arguments.callee.activeXString = versions[i];
          break;
        }
        catch(ex){
          //跳过
        }
      }
    }
    return new ActiveXObject(arguments.callee.activeXString);
  }else{
    throw new Error("No XHR object available.");
  }
}

function addURLParam(url,name,value){
  url+=(url.indexOf("?")==-1 ? "?":"&");
  url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
  return url;
}

var xhr = createXHR();

xhr.onreadystatechange = function(){
  if(xhr.readyState == 4){
    try{
      if((xhr.status >=200&&xhr.status<300) || xhr.status == 304){
        alert(xhr.responseText)
      }else{
        alert("Request was unsuccessful:"+xhr.status)
      }
    }catch(ex){
      //假设由ontimeout事件处理程序处理
    }
  }
}

xhr.open("get","timeout.php",true);
xhr.timeout = 1000;
xhr.ontimeout = function(){
  alert("Request did not return in a second.")
};
xhr.send(null);


function createCROSRequest(method,url){
  var xhr = new XMLHttpRequest();
  if("withCredentials" in xhr){
    xhr.open(method,url,true);
  }else if(typeof XDomainRequest != "undefined"){
    xhr = new XDomainRequest();
    xhr.open(method,url);
  }else{
    xhr = null;
  }
  return xhr;
}

var request = createCROSRequest("get","Http://www.somewhere.com/page");
if(request){
  request.onload = function(){
    //处理
  }
  request.onerror = function(){
    //处理
  }
  request.send();
}