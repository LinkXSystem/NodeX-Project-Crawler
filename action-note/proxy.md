> 忘记来源
```js
var request = require("request");
var iconv = require('iconv-lite');
var Promise = require("bluebird");


function getProxyList() {
    var apiURL = 'http://www.66ip.cn/mo.php?sxb=&tqsl=100&port=&export=&ktip=&sxa=&submit=%CC%E1++%C8%A1&textarea=http%3A%2F%2Fwww.66ip.cn%2F%3Fsxb%3D%26tqsl%3D100%26ports%255B%255D2%3D%26ktip%3D%26sxa%3D%26radio%3Dradio%26submit%3D%25CC%25E1%2B%2B%25C8%25A1';

    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            url: apiURL,
            gzip: true,
            encoding: null,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
                'User-Agent': 'Mozilla/8.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
                'referer': 'http://www.66ip.cn/'
            },

        };

        request(options, function (error, response, body) {


            try {

                if (error) throw error;

                if (/meta.*charset=gb2312/.test(body)) {
                    body = iconv.decode(body, 'gbk');
                }

                var ret = body.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,4}/g);


                resolve(ret);

            } catch (e) {
                return reject(e);
            }


        });
    })
}


getProxyList().then(function (proxyList) {

    var targetOptions = {
        method: 'GET',
        url: 'http://ip.chinaz.com/getip.aspx',
        timeout: 8000,
        encoding: null,
    };

    //这里修改一下，变成你要访问的目标网站
    proxyList.forEach(function (proxyurl) {

        console.log(`testing ${proxyurl}`);

        targetOptions.proxy = 'http://' + proxyurl;
        request(targetOptions, function (error, response, body) {
            try {
                if (error) throw error;


                body = body.toString();

                console.log(body);

                eval(`var ret = ${body}`);


                if (ret) {
                    console.log(`验证成功==>> ${ret.address}`);
                }
            } catch (e) {
                // console.error(e);
            }


        });

    });
}).catch(e => {
    console.log(e);
})
```

> 记录备份
```js
var factory = require('./options-component');
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
    var store = [];
    var length = 0;

    res.on('data', function (data) {
        store.push(data);
        length += data.length;
    });

    res.on('end', function (error) {
        var buffer = Buffer.concat(store, length);
        // console.log(buffer.toString('utf8'));
        // var html = iconv.decode(buffer, 'GBK');
        console.log(buffer.toString());
        // var list = html.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,4}/g);
        // console.log(list);
        // collecter(list);
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
        }).end();
    }, function (error) {
        if (error) console.log(error);
    });
}
```