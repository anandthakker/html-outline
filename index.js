var trumpet = require('trumpet');
var through = require('through2');
var duplexer = require('duplexer2');


var defaults = {
  indent: '  ',
  minDepth: 0,
  maxDepth: undefined
}

module.exports = function outline(opts) {
  opts = opts || {}
  for(opt in defaults) {
    if(opt in opts) continue;
    opts[opt] = defaults[opt];
  }
  
  var tr = trumpet();
  var out = through.obj();

  var state = { depth: 0 }
  
  tr.selectAll('*', function(elem) {
    if(opts.maxDepth && state.depth > opts.maxDepth) {
      return;
    }

    if(state.depth >= opts.minDepth) {
      var tabs = new Array(1 + state.depth - opts.minDepth).join(opts.indent);
      out.write(tabs + elem.name + '\n');
    }

    /* track depth */
    state.depth++;
    var stream = elem.createStream();
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
