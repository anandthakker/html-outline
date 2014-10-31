
var fs = require('fs'),
    outline = require('../');

fs.createReadStream(__dirname + '/index.html')
.pipe(outline({
  indent: '--',
  classNames: true,
  minDepth: 1
}))
.pipe(process.stdout);
