var events = require('events'), util = require('util');
var async = require('async');
var icaches = require('./icaches-component');
var helpers = require('./helpers-component');
var factory = require('./options-component');

util.inherits(Crawler, events.EventEmitter);

function Crawler() {
    events.EventEmitter.call(this);
}

var crawler = new Crawler();
module.exports = crawler;


crawler.on('user', function (entity) {
    // icaches.userstore.push(entity);
    console.log(entity);
});

crawler.on('core', function (name) {
    var option = factory.build(`/api/v4/members/${name}?include=following_count`);

    helpers.get(option, function (entity) {
        crawler.emit('crawler', entity.following_count, entity.url_token);
    });

    crawler.on('crawler', function (count, name) {
        if (count < 20) {
            crawler.follower(factory.build(`/api/v4/members/${name}/followees?limit=20&offset=0`));
        }

        crawler.asyncrawler(count, name, count / 20 + 1);
    });
});

crawler.follower = function (option) {
    helpers.get(option, function (entities) {
        for (var entity of entities.data) {
            crawler.emit('user', entity);
        }
    });
}

crawler.asyncrawler = function (count, name, num) {
    var options = [];
    for (var i = 0; i < count; i += 20) {
        options.push(factory.build(`/api/v4/members/${name}/followees?limit=20&offset=${i}`));
    }
    async.mapLimit(options, num, function (option, callback) {
        crawler.follower(option, callback);
    }, function (err) {
        if (err) console.error(err);
    })
}








