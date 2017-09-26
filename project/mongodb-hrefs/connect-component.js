const mongoose = require('mongoose');

const url = 'mongodb://localhost/linksystem';

mongoose.connect(url, {
    useMongoClient: true,
    promiseLibrary: global.Promise
});

mongoose.connection.on('connect', function () {
    console.log(`connect to ${url}`);
});

mongoose.connection.on('error', function (er) {
    console.log(`connect error : ${er.message}`);
});

mongoose.connection.on('disconnected', function () {
    console.log(`disconnect to ${url}`);
});

module.exports = mongoose;