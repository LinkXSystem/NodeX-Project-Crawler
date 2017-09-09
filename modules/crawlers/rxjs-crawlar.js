var https = require('https');

var options = {
    host: 'www.zhihu.com',
    path: '/api/v4/members/an-cheng-98',
    headers: {
        'authorization': 'oauth c3cef7c66a1843f8b3a9e6a1e3160e20'
    },
};

https.get(options, function (res) {
    var store = "";
    res.on('data', function (data) {
        store += data;
    });

    res.on('end', function () {
        console.log(JSON.parse(store));
    });
});



