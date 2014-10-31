html-outline
============

streaming transform html to a plaintext DOM outline.


## Usage

```javascript
var outline = require('html-outline');

var strm = outline({indent: '..'});
strm.pipe(process.stdout);

strm.write('<html><body><div><p><img></p><p></p><ul><li></li></ul></div></body></html>')
```

Outputs:
```
html
..body
....div
......p
........img
......p
......ul
........li
```


## Options

Options, with their defaults:
```javascript
{
  indent: '  ',
  minDepth: 0,
  maxDepth: undefined
}
```
