var factory = {
    build: function (host, port, path) {
        return {
            host: host,
            port: port,
            path: path
        }
    }
};

module.exports = factory;