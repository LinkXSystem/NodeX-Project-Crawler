var core = require('superagent');
var url = require('url');
var async = require('async');
var cheerio = require('cheerio');

let addr = 'http://cnodejs.org/';

function fetch(href, callback) {
    var delay = Math.floor((Math.random() * 10000000) % 2000);
    setTimeout(function () {
        core.get(href).end(function (err, page) {
            callback(null, handle([href, page.text]));
        });
    }, delay);
}

function handle(option) {
    var href = option[0], html = option[1];
    var $ = cheerio.load(html);
    return ({
        title: $('.topic_full_title').text(),
        href: href,
        content: $('.markdown-text').text()
    });
}

core.get(addr).end(function (err, page) {
    if (err) next(err);

    var $ = cheerio.load(page.text);
    var urls = [];
    $('#topic_list .topic_title').each(function (index, element) {
        var obj = $(element);
        urls.push(url.resolve(addr, obj.attr('href')));
    });

    async.mapLimit(urls, 5, function (href, callback) {
        fetch(href, callback);
    }, function (err, result) {
        if (err) console.log(err);
        console.log(result);
    });
});



