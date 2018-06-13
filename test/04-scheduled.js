var test = require('tape')
var fs = require('fs')
var parse = require('../')

test('@scheduled', t=> {
  t.plan(1)
  var mock = fs.readFileSync('./test/04-scheduled.arc').toString()
  var parsed = parse(mock)
  t.ok(parsed, 'read out scheduled')
  console.log(parsed)
})
