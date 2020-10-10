var test = require('tape')
var fs = require('fs')
var parse = require('../')

test('parse.yaml', t => {
  t.plan(1)
  var mock = fs.readFileSync('./test/mock/arc.yaml').toString()
  var parsed = parse.yaml(mock)
  t.ok(parsed, 'parsed yaml')
  console.log(parsed)
})
