var request = require('request');
var async = require('async');

function proxy() {
    var api = 'http://www.66ip.cn/mo.php?sxb=&tqsl=20&port=&export=&ktip=&sxa=&submit=%CC%E1++%C8%A1&textarea=';

    return new Promise((resolve, reject) => {
        var option = {
            method: 'GET',
            url: api
        };

        request(option, function (error, res, body) {
            try {
                if (error) throw error;

                var list = body.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,4}/g);

                resolve(list);
            } catch (ex) {
                reject(e)
            }
        });
    });
}


proxy().then(function (list) {
    // console.log(list);
    var options = [];

    list.forEach(function (url) {
        options.push({
            method: 'GET',
            url: 'https://www.zhihu.com',
            timeout: 8000,
            proxy: `http://${url}`
        });
    });

    async.mapLimit(options, options.length, function (option, callback) {
        request(option, function (error, res, body) {
            // if (error) callback(error, "Error!");
            if (error) return callback(error, 'Error!');

            // console.log(body);
            if (body) console.log(`The Available Proxy: ${option.proxy}`);

            callback(null, 'Success!');
        });
    }, function (error) {
        if (error) console.log(`The Interrupted Error Message: ${error.message}`);
    });

}).catch(error => {
    if (error) console.log(error);
});