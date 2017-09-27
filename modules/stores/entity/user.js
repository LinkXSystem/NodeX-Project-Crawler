const mongoose = require('mongoose');
const schema = mongoose.Schema;
const logger = require('../../log/index');

const user = new schema({
    names: String,
    token: String,
    heads: String
});

user.statics.findByName = function (name, callback) {
    this.find({names: name}, function (error, results) {
        if (error) logger.error(error.message);

        callback(results);
    });
}

module.exports = mongoose.model('users', user);