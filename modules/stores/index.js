const mongoose = require('./connect-component');
const user = require('./entity/user');
const logger = require('../log/index');

let link = new user({
    names: '吕海林',
    token: 'alhep',
    heads: '中医化管理研究者，重新诠释“系统思考”'
});

// link.save(function (error, result) {
//     if (error) return logger.error(error.message);
//
//     console.log(result);
//
//     mongoose.disconnect();
// })

user.findByName(/^吕/, function (results) {
    console.log(JSON.stringify(results));
})