var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: [{
        type: 'stdio',
        levels: ['error', 'warning']
    }]
    // log: 'trace'
});

client.index({
    index: 'link',
    type: 'linkx',
    body: {
        message: 'link the world!'
    }
}, function (error, response) {
    console.log(response);
});

// client.count({
//     index: 'link'
// }, function (error, response) {
//     console.log(response);
// });

client.search({
    index: 'link',
    q: 'message'
}).then(function (body) {
    var hits = body.hits.hits;
    console.log(hits);
}, function (error) {
    console.trace(error.message);
});