var trumpet = require('trumpet');
var through = require('through2');
var duplexer = require('duplexer2');


var defaults = {
  indent: '  ',
  minDepth: 0,
  maxDepth: undefined,
  select: '*',
  attributes: false,
  classNames: false
}

module.exports = function outline(opts) {
  opts = opts || {}
  for(opt in defaults) {
    if(opt in opts) continue;
    opts[opt] = defaults[opt];
  }
  
  
  if(Array.isArray(opts.select)) {
    opts.select = ':any(' + opts.select.join(',') + ')';
  }
  opts.select = '*:any('+ opts.select + ', ' + opts.select + ' *)'
  
  var tr = trumpet();
  var out = through.obj();

  var state = { depth: 0 }
  
  tr.selectAll(opts.select, function(elem) {
    if(opts.maxDepth && state.depth > opts.maxDepth) {
      return;
    }

    var stream = elem.createStream();

    if(state.depth >= opts.minDepth) {
      var tabs = new Array(1 + state.depth - opts.minDepth).join(opts.indent);
      elem.getAttributes(function(attrs) {
        out.write(tabs);
        out.write(elem.name);
        if(opts.classNames && 'class' in attrs) {
          out.write('.' + attrs.class)
        }
        if(opts.attributes && Object.keys(attrs).length > 0) {
          out.write('[');
          out.write(Object.keys(attrs).map(function(attrName) {
            return attrName + '="' + attrs[attrName] + '"';
          }).join(' '))
          out.write(']');
        }
        out.write('\n');
      });
    }
    
    /* track depth */
    state.depth++;
    stream.pipe(through.obj(write, end)).pipe(stream);
    function write(chunk, enc, cb) { cb(null, chunk); }
    function end(cb) {
      state.depth--;
      cb();
    }

  });
  
  tr.on('end', out.end.bind(out));
  tr.resume();
  
  return duplexer(tr, out);
  
}
