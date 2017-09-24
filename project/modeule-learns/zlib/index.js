const zlib = require('zlib');
const fs = require('fs');

const gzip = zlib.createGzip();

const input = fs.createReadStream('./index.js');
const output = fs.createWriteStream('./index.js.gz');

input.pipe(gzip).pipe(output);