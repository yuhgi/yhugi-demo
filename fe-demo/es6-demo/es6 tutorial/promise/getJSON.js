let getJSON = function(url){
  return new Promise(function(resolve,reject){
    let xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.onreadystatechange = handler;
    xhr.responseType = 'json';
    xhr.setRequestHeader('Accept','application/json');
    xhr.send();
    function handler(){
      if(this.readyState !==4){
        return;
      }
      if(this.status === 200 || this.status === 304){
        resolve(this.response);
      }else{
        reject(new Error(this.statusText));
      }
    }
  });
};

getJSON('json/get.json',function(json){
  console.log(json);
},function(error){
  console.error('出错了',error);
});