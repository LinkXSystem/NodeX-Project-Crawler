var cheerio = require('cheerio');
var https = require('https');
var rxjs = require('rxjs');
var fs = require('fs');

function crawler () {
    https.get('https://www.zhihu.com/people/po-ling/following', function (res) {
        var store = '';
        res.on('data', function (chunk) {
            store += chunk;
        });

        res.on('end', function () {

            var $ = cheerio.load(store);

            $('script').remove();

            var data = JSON.parse($('#data').attr('data-state'));

            return data.entities.users;
        });
    });
}

console.log(crawler());


// var observable = rxjs.Observable.create(crawler())
//     .map(value => console.log(value));
//
// observable.subscribe((data) => {
//
// }, (err) => {
//     throw err;
// });
