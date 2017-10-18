"use strict";
let p1 = new Promise((resolve,reject) => {
    console.log("start p1");
    setTimeout(()=>{
        console.log("p1 timeout");
        resolve("p1 done");
        //throw new Error("Whoops! This is a error here!");
    },5000);
});
let p2 = new Promise((resolve,reject) => {
    console.log("start p2");
    setTimeout(()=>{
        console.log("p2 timeout");
        resolve(p1);
    },0);
});

p2.then((result) => {
    console.log("p2 callback");
    console.log(result);
}).catch((error) => {
    console.log(error);
});

