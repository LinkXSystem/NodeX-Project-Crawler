var factory = require('./options-component');
var iconv = require('iconv-lite');
var http = require('http');
var async = require('async');


var option = {
    host: 'www.66ip.cn',
    path: '/mo.php?sxb=&tqsl=20&port=&export=&ktip=&sxa=&submit=%CC%E1++%C8%A1&textarea=http%3A%2F%2Fwww.66ip.cn%2F%3Fsxb%3D%26tqsl%3D30%26ports%255B%255D2%3D%26ktip%3D%26sxa%3D%26radio%3Dradio%26submit%3D%25CC%25E1%2B%2B%25C8%25A1',
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
    },
}

http.get(option, function (res) {
    var store = [];
    var length = 0;

    res.on('data', function (data) {
        store.push(data);
        length += data.length;
    });

    res.on('end', function (error) {
        var buffer = Buffer.concat(store, length);
        var html = iconv.decode(buffer, 'gbk');
        var list = html.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,4}/g);
        console.log(list);
        collecter(list);
    });
});


function collecter(list) {
    var optionstore = [];
    for (var i = 0; i < list.length; i++) {
        var main = list[i].split(':');
        optionstore.push(factory.build(main[0], main[1], 'www.zhihu.com'));
    }
    async.mapLimit(optionstore, optionstore.length, function (option, callback) {
        http.request(option, function (res) {

            res.on('error', function (error) {
                console.log(error);
            });

            res.on('end', function () {
                console.log(this.url);
                callback(null, 'LinkSystem!');
            });
        });
    }, function (error) {
        if (error) console.log(error);
    });
}