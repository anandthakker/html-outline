html-outline
============

streaming transform html to a plaintext DOM outline.


## Usage

```javascript
var outline = require('html-outline');

fs.createReadStream('your.html').pipe(outline(opts)).pipe(process.stdout);
```

## Options

Example `opts`, with the defaults shown:
```javascript
{
  indent: '  ',
  minDepth: 0,
  maxDepth: undefined
}
```
