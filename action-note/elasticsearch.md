> 快速启动
```js
var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

client.ping({
    requestTimeout: 1000
}, function (error) {
    if (error) {
        console.log('elasticsearch cluster is down!');
    } else {
        console.log('All is well!');
    }
});

client.search({q: 'pants'}).then(function (body) {
    var hits = body.hits.hits;
}, function (error) {
    console.trace(error.message);
});

client.search({
    index: 'twitter',
    type: 'tweets',
    body: {
        query: {
            match: {
                body: 'elasticsearch'
            }
        }
    }
}).then(function (resp) {
    var hits = resp.hits.hits;
}, function (error) {
    console.log(error.message);
});
```
> 简单存储
```js
client.index({
    index: 'link',
    type: 'linkx',
    body: {
        message: 'link the world!'
    }
}, function (error, response) {
    console.log(response);
})
```
```js
//在特定索引中添加一个类型化的JSON文档，使其可搜索。如果具有相同index，type且id已经存在的文档将发生错误。 
client.create({
    index: 'myindex',
    type: 'mytype',
    id: '2',
    body: {
        title: 'Test 2',
        tags: ['y', 'z'],
        published: true,
        published_at: '2014-01-01',
        counter: 1
    }
}, function (error, res) {
    console.log(res)
});

client.count({
    index: 'myindex'
}, function (error, response) {
    console.log(response);
})

client.search({
    index: 'myindex',
    q: 'Test'
}).then(function (body) {
    var hits = body.hits.hits;
    console.log(hits);
}, function (error) {
    console.trace(error.message);
});
```

> 批处理
```js
client.bulk({
    body: [
        {index : {_index: 'myindex', _type: 'mytype', _id: 1}},
        {message: 'store the message' },
        {update: {_index: 'myindex', _type: 'mytype', _id: 2}},
        {doc:{ message: 'update the message'}}
    ]
});
```
