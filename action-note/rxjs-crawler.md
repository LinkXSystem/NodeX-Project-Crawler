```js
var crawler = require('./crawler-component');
var cheerio = require('cheerio');
var Rx = require('rxjs');
var https = require('https');
var context = require('./context-component');
var factory = require('./options-component');


var option = factory.build('/api/v4/members/sakya_ye/followees?limit=20&offset=0');

loop(option, 0);

function loop(option, i) {
    https.get(option, function (res) {
        var store = "";
        res.on('data', function (data) {
            store += data;
        });

        res.on('end', function () {
            var entity = JSON.parse(store);

            crawler.emit('list', entity, context);

            console.log(entity.paging.next);

            // 递归崩溃
            if (entity.paging.totals >  i)
                loop(factory.build(entity.paging.next.substring(20)), i + 20);
        });
    });
}
```

