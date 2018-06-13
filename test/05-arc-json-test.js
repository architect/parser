var test = require('tape')
var fs = require('fs')
var parse = require('../')

test('@scheduled', t=> {
  t.plan(1)
  var mock = fs.readFileSync('./test/05-mock-arc.json').toString()
  var parsed = parse.json(mock)
  t.ok(parsed, 'parsed json')
  console.log(parsed)
})
