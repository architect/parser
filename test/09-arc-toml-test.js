var test = require('tape')
var fs = require('fs')
var parse = require('../')

test('parse.toml', t=> {
  t.plan(1)
  var mock = fs.readFileSync('./test/mock/arc.toml').toString()
  var parsed = parse.toml(mock)
  t.ok(parsed, 'parsed yaml')
  console.log(parsed)
})
