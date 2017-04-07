var test = require('tape')
var fs = require('fs')
var parse = require('../')

test('test base mock file', t=> {
  t.plan(1)
  var mock = fs.readFileSync('./test/mock-base').toString()
  var parsed = parse(mock)
  t.ok(parsed, 'parsed mock')
  console.log(JSON.stringify(parsed, null, 2))
})

test('arc file must start with an @section', t=> {
  t.plan(1)
  var mock = fs.readFileSync('./test/mock-bad-empty').toString()
  try {
    var parsed = parse(mock)
    t.fail('no opening @')
  }
  catch(e) {
    t.ok(e, 'failed on bad input')
    console.log(e)
  }
})
