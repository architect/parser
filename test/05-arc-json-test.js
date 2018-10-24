var test = require('tape')
var fs = require('fs')
var parse = require('../')

test('should parse mock arc.json', t=> {
  t.plan(1)
  var mock = fs.readFileSync('./test/05-mock-arc.json').toString()
  var parsed = parse.json(mock)
  t.ok(parsed, 'parsed json')
  console.log(parsed)
})

test('should serialize mock arc.json to .arc', t=> {
  t.plan(1)
  var mock = fs.readFileSync('./test/05-mock-arc.json').toString()
  var parsed = parse.json.stringify(mock)
  t.ok(parsed, 'parsed json')
  console.log(parsed)
})
