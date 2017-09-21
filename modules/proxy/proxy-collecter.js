var factory = require('./options-component');
var helpers = require('./helpers-component');
var http = require('http');
var async = require('async');


var option = {
    host: 'www.66ip.cn',
    path: '/mo.php?sxb=&tqsl=100&port=&export=&ktip=&sxa=&submit=%CC%E1++%C8%A1&textarea=http%3A%2F%2Fwww.66ip.cn%2F%3Fsxb%3D%26tqsl%3D100%26ports%255B%255D2%3D%26ktip%3D%26sxa%3D%26radio%3Dradio%26submit%3D%25CC%25E1%2B%2B%25C8%25A1',
}

http.get(option, function (res) {
    var datastore = "";

    res.on('data', function (chuck) {
        datastore += chuck;
    });

    res.on('end', function (error) {
        try {
            if (error) throw error;

            var list = datastore.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5}/g);

            collecter(list);
        } catch (ex) {

        }
    });
});


function collecter(list) {
    var options = [];
    for (var i = 0; i < list.length; i++) {
        var main = list[i].split(':');
        options.push(factory.build(main[0], main[1], 'www.zhihu.com'));
    }
    async.mapLimit(options, options.length, function (option, callback) {
        helpers.proxy(option, function (data) {
            console.log(data);
        });

        callback(null, "message");
    }, function (error) {
        if (error) console.log(error);
    });
}