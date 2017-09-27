const logger = require('../log/index');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/crawler';

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', function () {
    logger.info(`connect to ${url}`)
});

mongoose.connect(url, {
    useMongoClient: true
});

mongoose.connection.on('error', function (er) {
    logger.error(`connect' s error : ${er.message}`)
});

mongoose.connection.on('disconnected', function () {
    logger.info(`disconnect to ${url}`);
});

module.exports = mongoose;