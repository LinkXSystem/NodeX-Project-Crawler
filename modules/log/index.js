const log4js = require('log4js');

log4js.configure({
    appenders: {
        cheese: {type: 'file', filename: '../../resources/crawler-logs/crawler-logs.log'}
    },
    categories: {
        default: {appenders: ['cheese'], level: 'info'}
    }
});

module.exports = log4js.getLogger('cheese');