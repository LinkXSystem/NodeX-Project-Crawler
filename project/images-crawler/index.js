const cheerio = require('cheerio');
const http = require('http');
const fs = require('fs');
const path = require('path');

http.get('http://www.cvfes.com/girlsfrontline.html#cn01', function (res) {
    let html = '';

    res.on('data', function (chunk) {
        html += chunk;
    });

    res.on('end', function (error) {
        if (error) throw error;

        crawler(html);
    });
});

function crawler(html) {
    var list = html.match(/http:\/\/girlsfrontline.nos-eastchina1.126.net\/c_\d{3}\.png/g);

    list.forEach(function (url) {
        let array = url.split('/');
        downloadImage(url, '../../resource/girls/image/', array[array.length - 1]);
    });
}

function downloadImage(url, dir, image) {
    http.get(url, function (res) {
        var data = '';
        res.setEncoding('binary');
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            fs.writeFile(dir + path.basename(image), data, 'binary', function (err) {
                if (err) console.error(err);
            });
        });
    }).on('error', function (err) {
        console.error(err);
    });
}