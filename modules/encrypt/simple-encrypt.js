var factory = require('../proxy/options-component');
var iconv = require('iconv-lite');
var http = require('http');
var async = require('async');


var option = {
    host: 'www.66ip.cn',
    path: '/mo.php?sxb=&tqsl=100&port=&export=&ktip=&sxa=&submit=%CC%E1++%C8%A1&textarea=http%3A%2F%2Fwww.66ip.cn%2F%3Fsxb%3D%26tqsl%3D100%26ports%255B%255D2%3D%26ktip%3D%26sxa%3D%26radio%3Dradio%26submit%3D%25CC%25E1%2B%2B%25C8%25A1',
    // headers: {
    //     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    //     'Accept-Encoding': 'gzip, deflate',
    //     'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
    //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
    // },
}

http.get(option, function (res) {
    var store = "";

    res.on('data', function (chunk) {
        store += chunk;
    });

    res.on('end', function (error) {
        if (error) throw error;

        console.log(store);
    });
});