var express = require('express');
var router = express.Router();
var url = require('url');
var core = require('superagent');
var cheerio = require('cheerio');
var proxy =require('eventproxy');

/* get search page. */
router.get('/', function (req, res, next) {
    res.render('search');
});

module.exports = router;
