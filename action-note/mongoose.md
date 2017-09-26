> 流程控制的原型
```js
const mongoose = require('./connect-component');

const schema = mongoose.Schema;

const blog = new schema({
    title: String
});

blog.methods.findByTitles = function (title, callback) {
    this.model('blogs').find({title: title}, function (error, results) {
        if (error) throw error;

        callback(results);
    });
};

const Blog = mongoose.model('blogs', blog);

let entity = new Blog({title: 'linksystem'});

entity.save(function (error, result) {
    if (error) return console.log(error.message);

    console.log(JSON.stringify(result));

    entity.findByTitles(/^link/, function (results) {
        console.log(results);
    });

    Blog.remove(function () {
        mongoose.disconnect();
    })
});
```

> 基于 Co 流程控制
```js
const mongoose = require('./connect-component');
const co = require('co');
const assert = require('assert');

const schema = mongoose.Schema;

const blog = new schema({
    title: String
});

blog.methods.findByTitles = function (title, callback) {
    this.model('blogs').find({title: title}, function (error, results) {
        if (error) throw error;

        callback(results);
    });
};

const Blog = mongoose.model('blogs', blog);


function store() {
    return new Promise((resolve, reject) => {
        let entity = new Blog({title: 'linksystem'});

        entity.save(function (error, result) {
            if (error) return reject(error.message);

            // console.log(JSON.stringify(result));
            resolve(result);
        });
    });
}

function finds() {
    return new Promise((resolve, reject) => {
        // entity.findByTitles(/^link/, function (results) {
        //     resolve(results);
        // });

        Blog.find({title: /^link/}, function (error, results) {
            if (error) reject(error);

            resolve(results);
        });
    });
}

function clean() {
    return new Promise((resolve, reject) => {
        Blog.remove(function (error) {
            if (error) reject(error);
            mongoose.disconnect();
            // resolve('disconnect to mongodb://localhost/linksystem');
        });
    });
}

co(function* () {
    let entity = yield store();
    let result = yield finds();
    console.log(entity, result);
    let messes = yield clean();
}).then((error) => {
    if (error) throw error;
});
```