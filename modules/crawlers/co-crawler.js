var factory = require('./rxjs-crawler/options-component');
var https = require('https'), co = require('co');
var async = require('async');

var option = factory.build('/api/v4/members/po-ling?include=following_count');

https.get(option, function (res) {
    var store = "";
    res.on('data', function (data) {
        store += data;
    });

    res.on('end', function () {
        var entity = JSON.parse(store);
        asyncrawler(entity.following_count, 'yuan-su-49', 1);
    });
});

function datastore(option, callback) {
    https.get(option, function (res) {
        var store = "";
        res.on('data', function (data) {
            store += data;
        });

        res.on('end', function () {
            var entity = JSON.parse(store);
            if (entity) console.log(entity);
            callback(null, 'Crawl Done !');
        });
    });
}

function asyncrawler(count, name, num) {
    var options = [];
    for (var i = 0; i < count; i += 20) {
        options.push(factory.build(`/api/v4/members/${name}/followees?limit=20&offset=${i * 20}`));
    }
    async.mapLimit(options, num, function (option, callback) {
        datastore(option, callback);
    }, function (err) {
        if (!err) console.log('Crawler Complete!');
    })
}
