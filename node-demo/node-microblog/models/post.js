'use strict';
const MongoClient = require('mongodb').MongoClient;
const settings = require('../settings');

class Post{
    constructor(username,post,time){
        this.user = username;
        this.post = post;
        if(time){
            this.time = time;
        }else{
            this.time = new Date();
        }
        
    }
    static get(username){
        return new Promise((resolve,reject) => {
            MongoClient.connect(settings.url,(err,db) => {
                if(err){
                    db.close();
                    reject(err);
                }
                var query = {};
                if(username){
                    query.user = username;
                }
                db.collection('posts').find(query).toArray((err,docs) => {
                    var posts = [];
                    if(err){
                        reject(err);
                    }
                    docs.forEach((doc) => {
                        posts.push(new Post(doc.user,doc.post,doc.time));
                    });
                    resolve(posts);
                });
            });
        });
    }
    save(){
        return new Promise((resolve,reject) => {
            var post = {
                user:this.user,
                post:this.post,
                time:this.time
            };
            MongoClient.connect(settings.url,(err,db) => {
                if(err){
                    db.close();
                    reject(err);
                }
                const collection = db.collection('posts');
                collection.insert(post,(err) => {
                    db.close();
                    if(err){
                        reject(err);
                    }
                    resolve(post);
                });
            });
        });
    }
}

module.exports = Post;