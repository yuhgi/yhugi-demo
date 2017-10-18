var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://192.168.0.243:27017/myNewDatabase';

var insertDocuments = function(db, callback){
    // get ths documents collection
    var collection = db.collection('documents');

    // insert some documents
    collection.insertMany([
        {a:1},{a:2},{a:3}
    ],function(err,result){
        assert.equal(err,null);
        assert.equal(3,result.result.n);
        assert.equal(3,result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};

var findDocuments = function(db,callback){
    // get the documents collection
    var collection = db.collection('documents');
    // find some documents
    collection.find({a:3}).toArray(function(err,docs){
        assert.equal(err,null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};

var updateDocument = function(db,callback){
    // get the documents collection
    var collection = db.collection('documents');
    // update document where a is 2, set b equal to 1
    collection.updateOne({a:2},{
        $set:{b:1}
    },function(err,result){
        assert.equal(err,null);
        assert.equal(1,result.result.n);
        console.log("updated the document with the field a equal to 2");
        callback(result);
    });
};

var removeDocument = function(db,callback){
    // get the documents collection
    var collection = db.collection('documents');
    // remove some documents
    collection.deleteOne({a:3},function(err,result){
        assert.equal(err,null);
        assert.equal(1,result.result.n);
        console.log("removed the document with the field a equal to 3");
        callback(result);
    });
};

var indexCollection = function(db,callback){
    db.collection('documents').createIndex({
        a:1
    },null,function(err,results){
        console.log(results);
        callback();
    });
};


MongoClient.connect(url,function(err,db){
    assert.equal(null,err);
    console.log("Connection successfully to server");
    /*insertDocuments(db,function(){
        updateDocument(db,function(){
            removeDocument(db,function(){
                db.close();
            });
        });
    });*/
    insertDocuments(db,function(){
        indexCollection(db,function(){
            db.close();
        });
    });
});

