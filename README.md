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
  maxDepth: undefined,
  selector: '*'
}
```

- `indent` is a stringish; repeated `depth` times and prepended to each element name.
- `minDepth` and `maxDepth` refer do depth in the DOM tree, with the first
  element considered depth 0.  Indentation repsects `minDepth`.
- `selector` is a css selector (or array of them) supported by [cssauron][1], and
  can be used to filter the outline. Any elements matching the provided 
  selector(s) and all of their children (up to `maxDepth`) will be included. 
  (So, e.g., `{minDepth: 2}` and `{selector: 'div'}` would do the same thing in 
  the example above.)


# Thanks
- [substack/node-trumpet][2]


[1]: https://github.com/chrisdickinson/cssauron
[2]: https://github.com/substack/node-trumpet
