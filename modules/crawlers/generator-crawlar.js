'use strict'

var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

var option = {
    hostname: 'movie.douban.com',
    path: '/top250',
    port: 80
}

function spider(index) {
    https.get('https://movie.douban.com/top250?start=' + index, function (res) {
        var movies = [];
        var size = 25;
        var html = '';
        res.setEncoding('UTF-8');

        res.on('data', function (chunk) {
            html += chunk;
        });

        res.on('end', function () {
            var $ = cheerio.load(html);

            $('.item').each(function () {
                var image = $('.pic img', this).attr('src');

                var movie = {
                    title: $('.title', this).text(),
                    link: $('a', this).attr('href'),
                    image: image,
                    star: $('.info .star .rating_num', this).text()
                };

                if (movie) {
                    movies.push(movie);
                }

                downloadImage('../resource/douban/image/', movie.image);
            });

            stores('../resource/douban/json/movies-'+ (index / size) + '-data.json', movies);
        }).on('error', function (err) {
            console.error(err);
        });
    })
}

function downloadImage(dir, image) {
    https.get(image, function (res) {
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

function stores(path, movies) {
    fs.writeFile(path, JSON.stringify(movies, null, ' '), function (err) {
        if (err) console.error(err);
    });
}

function *doSpider(x) {
    var start = 0;
    console.log(start + ' ---------------------------------- ');
    while (start < x) {
        yield start;
        spider(start);
        start += 25 ;
    }
}


for (var x of doSpider(250)) {
    console.log(x);
}