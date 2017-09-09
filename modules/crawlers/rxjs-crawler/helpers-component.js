var https = require('https');

var helpers = {}
module.exports = helpers;

helpers.get = function (option, callback) {
    https.get(option, function (res) {
        // clearTimeout(timer);
        //
        // // 等待响应60秒超时
        // var timer = setTimeout(function() {
        //     res.destroy();
        //     console.log('Timeout!');
        // }, 60000);

        var store = "";
        res.on('data', function (data) {
            store += data;
        });

        res.on('end', function () {
            var entity = JSON.parse(store);
            callback(entity);
        });
    });
}

