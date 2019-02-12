const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', err => {
    console.log(err);
});

db.once('open', () => {
    const kittySchema = new mongoose.Schema({
        name: String,
    });
    kittySchema.methods.speak = function() {
        const greeting = this.name
            ? `Meow name is ${this.name}`
            : "I don't have a name";
        console.log(greeting);
    };
    const Kitten = mongoose.model('Kitten', kittySchema);
    let silence = new Kitten({ name: 'Slience' });
    let fluffy = new Kitten({name:'fluffy'});
    // fluffy.save((err,fluffy) => {
    //     if(err) return console.log(err);
    //     fluffy.speak();
    // });

    Kitten.find(function(err,kittens){
        if(err) return console.log(err);
        console.log(kittens);
    })
});
