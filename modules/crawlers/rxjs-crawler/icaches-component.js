var events = require('events'), util = require('util');

util.inherits(ICaches, events.EventEmitter);

function ICaches() {
    events.EventEmitter.call(this);

    this.userstore = [];
    this.hrefstore = [];
}

var icaches = new ICaches();

module.exports = icaches;

icaches.on('list', function () {
    for (var user of this.userstore) {
        console.log(user);
    }
});