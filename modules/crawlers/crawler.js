var proxy =require('eventproxy');
var core = require('superagent');
var url = require('url');
var cheerio = require('cheerio');

let addr = 'http://cnodejs.org/';

var count = 40;

var action = proxy();

action.after('crawler', count, function (topics) {
    topics = topics.map(function (option) {
        var href = option[0], html = option[1];
        var $ = cheerio.load(html);
        return ({
           title: $('.topic_full_title').text(),
           href: href,
           content: $('.markdown-text').text()
        });
    });

    console.log(topics);
});


core.get(addr).end(function (err, page) {
    if (err) next(err);

    var $ = cheerio.load(page.text);
    var urls = [];
    $('#topic_list .topic_title').each(function (index, element) {
        var obj = $(element);
        urls.push(url.resolve(addr, obj.attr('href')));
    });

    urls.forEach(function (href) {
        core.get(href).end(function (err, page) {
            action.emit('crawler', [href, page.text])
        });
    });
});



