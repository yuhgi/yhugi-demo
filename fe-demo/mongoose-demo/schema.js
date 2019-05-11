'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const animalSchema = new Schema({
    name:String,
    type:String
});

animalSchema.methods.findSimilarTypes = function(cb){
    console.log(this)
    return this.model('Animal').find({
        type:this.type
    },cb);
}

animalSchema.statics.findByName = function(name,cb){
    // console.log(this)
    return this.find({
        name:new RegExp(name,'i'),
        cb
    });
}

const Animal = mongoose.model('Animal',animalSchema);

const dog = new Animal({
    name:'afido',
    type:'dog'
});

// dog.save();

// dog.findSimilarTypes((err,dogs) => {
//     console.log(dogs);
// });

Animal.findByName('afido',(err,animals) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(animals);
});

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
