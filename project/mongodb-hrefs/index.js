const mongoose = require('mongoose');

const url = 'mongodb://localhost/linksystem';

mongoose.connect(url, {
    useMongoClient: true,
    promiseLibrary: global.Promise
});

mongoose.connection.on('connect', function () {
    console.log(`connect to ${url}`);
});

const cat = mongoose.Schema({
    name: String
});

cat.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
}

const Cat = mongoose.model('cats', cat);

let link = new Cat({name: 'link'});

// link.save(function (error, cat) {
//     if (error) return console.log(error);
//
//     console.log(JSON.stringify(cat));
//
//     cat.speak();
// });


Cat.find(function (error, cat) {
    if (error) return console.log(error);


    console.log(cat);

    // cat.speak();
});


Cat.find({name: /^li/}, function (error, cat) {
    if (error) return console.log(error);

    console.log(cat);

    // cat.speak();
});

mongoose.disconnect();


mongoose.connection.on('disconnected', function () {
    console.log(`disconnect to ${url}`);
});