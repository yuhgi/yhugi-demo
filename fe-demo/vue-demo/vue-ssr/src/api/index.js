export function fetchItem(id){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve({
                id:'1',
                title:'item1'
            });
        }, 1000);
    });
}