import {postJSON} from 'utils/ajax.js';

export default {
    getProducts(){
        return new Promise((resolve,reject) => {
            postJSON({
                url:'products/getProducts',
                data:{}
            }).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    buyProducts(){
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            },1000);
        });
    }
};