var test = require('tape')
var fs = require('fs')
var _remove = require('../src/_remove-comments')

test('removed comments', t=> {
  t.plan(1)
  var mock = fs.readFileSync('./test/02-mock-comments-arc').toString()
  var parsed = _remove(mock)
  t.ok(parsed, 'failed on bad input')
  console.log(parsed)

})
