// var options = {
//     host: 'www.zhihu.com',
//     path: '',
//     headers: {
//         'authorization': 'oauth c3cef7c66a1843f8b3a9e6a1e3160e20'
//     },
// };

var factory = {
    build: function (path) {
        return {
            host: 'www.zhihu.com',
            path: path,
            headers: {
                'authorization': 'oauth c3cef7c66a1843f8b3a9e6a1e3160e20'
            }
        }
    }
};

module.exports = factory;
