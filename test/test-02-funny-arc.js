var test = require('tape')
var fs = require('fs')
var parse = require('../')

test('funny mock', t=> {
  t.plan(1)
  var mock = fs.readFileSync('./test/mock-funny').toString()
  var parsed = parse(mock)
  t.ok(parsed, 'parsed mock')
  console.log(JSON.stringify(parsed, null, 2))
})
