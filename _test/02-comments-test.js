var test = require('tape')
var fs = require('fs')
var parse = require('../')

test('removed comments', t=> {
  t.plan(1)
  var mock = fs.readFileSync('./test/02-mock-comments-arc').toString()
  try {
    var parsed = parse(mock)
    t.ok(parsed, 'failed on bad input')
    console.log(JSON.stringify(parsed,null,2))
  }
  catch(e) {
    t.fail(e)
    console.log(e)
  }
})
