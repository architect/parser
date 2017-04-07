var test = require('tape')
var fs = require('fs')
var parse = require('../')

test('test aws arc by parsing mock-arc', t=> {
  t.plan(1)
  var mock = fs.readFileSync('./test/readme-arch').toString()
  var parsed = parse(mock)
  t.ok(parsed, 'parsed mock')
  console.log(JSON.stringify(parsed, null, 2))
})
