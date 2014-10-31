var test = require('tape');
var fs = require('fs');
var concat = require('concat-stream');
var outline = require('../');

test('default', function(t) {
  t.plan(1);
  fs.createReadStream(__dirname + '/simple.html')
  .pipe(outline())
  .pipe(concat(function(data) {
    t.equal(data.toString(), 'html\n  body\n    div\n      p\n      img\n    div\n      p\n      img\n    div\n      p\n      img\n');
  }));
})


test('indentation', function(t) {
  t.plan(1);
  fs.createReadStream(__dirname + '/simple.html')
  .pipe(outline({indent: '..'}))
  .pipe(concat(function(data) {
    t.equal(data.toString(), 'html\n..body\n....div\n......p\n......img\n....div\n......p\n......img\n....div\n......p\n......img\n');
  }));
})

test('maxDepth', function(t) {
  t.plan(1);
  fs.createReadStream(__dirname + '/simple.html')
  .pipe(outline({maxDepth: 2}))
  .pipe(concat(function(data) {
    t.equal(data.toString(), 'html\n  body\n    div\n    div\n    div\n');
  }));
})

test('minDepth', function(t) {
  t.plan(1);
  fs.createReadStream(__dirname + '/simple.html')
  .pipe(outline({minDepth: 2}))
  .pipe(concat(function(data) {
    t.equal(data.toString(), 'div\n  p\n  img\ndiv\n  p\n  img\ndiv\n  p\n  img\n');
  }));
})

test('select', function(t) {
  t.plan(1);
  fs.createReadStream(__dirname + '/simple.html')
  .pipe(outline({select: 'div'}))
  .pipe(concat(function(data) {
    t.equal(data.toString(), 'div\n  p\n  img\ndiv\n  p\n  img\ndiv\n  p\n  img\n');
  }));
})
