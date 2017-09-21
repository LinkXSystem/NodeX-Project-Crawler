var http = require('http');

var helper = {};

module.exports = helper;

helper.get = function (option, callback) {
    http.request(option, function (res) {
        var datastore = '';

        res.on('data', function (chunk) {
            datastore += chunk;
        });

        res.on('end', function () {
            callback(datastore);
        });

        res.on('error', function (error) {
            console.log(error);
        })
    }).on('error', function (errors) {
        console.log(errors);
    }).end();
};

helper.proxy = function (option, callback) {
    var action = http.request(option);
    var datastore = '';

    action.on('connect', function (res, socket) {
        socket.write(`GET / HTTP/1.1\r\n HOST: ${option.path.split(':')[0]}\r\n Connection: Close\r\n\r\n`);

        socket.on('data', function (chunk) {
            datastore += chunk;
        });

        socket.on('end', function () {
           callback(datastore);
        });
    });

    action.end();

    action.on('error', function (error) {
        if (error) throw error;
    })
};
