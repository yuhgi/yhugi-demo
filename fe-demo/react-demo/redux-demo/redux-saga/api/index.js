
function storeItem(obj){
    for(let key of Object.keys(obj)){
        window.localStorage.setItem(key,obj[key]);
    }
}

function clearItem(item){
    window.localStorage.removeItem(item);
}

function authorize(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('token-12345');
        }, 3000);
    });
}

function fetchUser(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(Math.random() > 0.5){
                resolve({
                    success:true,
                    data:1
                });
            }else{
                reject({
                    success:false
                });
            } 
        }, 1000);
    });
}

export default {
    fetchUser,
    authorize,
    storeItem,
    clearItem
}