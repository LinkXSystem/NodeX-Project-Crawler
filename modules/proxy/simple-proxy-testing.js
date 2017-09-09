var request = require('request');
var co = require('co');

var option = {
    url: 'https://www.zhihu.com',
    method: 'GET',
    timeout: 2000,
    encoding: 'UTF-8',
    proxy: 'http://218.56.132.156:8080'
}


co(function* () {
    for (var i = 0; i < 10; i ++) {
        try {
            var result = yield new Promise((resolve, reject) => {
                request(option, function (error, response, body) {
                    try {
                        if (error) throw error;

                        resolve(body);
                    } catch (error) {
                        reject(error);
                    }
                });
            });

            console.log(`Message: ${result}`);
        } catch (error) {
            console.log(`Application's Message: ${error}`);
        }
    }
}).catch(function (error) {
    console.log(`Thread's Message: ${error}`);
});



