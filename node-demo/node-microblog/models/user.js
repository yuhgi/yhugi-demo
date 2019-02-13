'use strict';
const MongoClient = require('mongodb').MongoClient;
const settings = require('../settings');

class User{
    constructor(name,password){
        this.name = name;
        this.password = password;
    }
    save(){
        const user = {
            name:this.name,
            password:this.password
        };
        return new Promise((resolve,reject) => {
            MongoClient.connect(settings.url,function(err,db){
                if(err){
                    db.close();
                    reject(err);
                }
                const collection = db.collection('user');
                // 写入 user 文档
                collection.insert(user,(err) => {
                    db.close();
                    if(err){
                        reject(err);
                    }
                    resolve(user);
                });
            });
        });
    }
    static get(username){
        return new Promise((resolve,reject) => {
            MongoClient.connect(settings.url,function(err,db){
                if(err){
                    db.close();
                    reject(err);
                }
                const collection = db.collection('user');
                // 写入 user 文档
                collection.findOne({name:username},(err,user) => {
                    db.close();
                    if(err){
                        reject(err);
                    }
                    resolve(user);
                });
            });
        });
    }
}

module.exports = User;
