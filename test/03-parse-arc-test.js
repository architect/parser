var test = require('tape')
var fs = require('fs')
var parse = require('../')

test('test base mock file', t => {
  t.plan(12)
  var mock = fs.readFileSync('./test/mock/simple.arc').toString()
  var parsed = parse(mock)
  t.ok(parsed, 'parsed mock')
  // eslint-disable-next-line
  t.ok(parsed.hasOwnProperty('attr'), 'has attr')
  t.ok(Array.isArray(parsed.attr), 'attr is array')
  t.ok(parsed.attr[0] === 'single', "1st member is string 'single'")
  t.ok(parsed.attr[1] === false, '2nd member is a false')
  t.ok(parsed.attr[2] === 1, '3rd member is a 1')
  t.ok(parsed.attr[3] === -1, '4th member is a 1')
  t.ok(Array.isArray(parsed.attr[4]), '5th member is an array with two members')
  t.ok(parsed.attr[4].length === 2, '6th member is a tuple')
  t.ok(parsed.attr[5].length === 7, '7th member is a vector of seven members')
  t.ok(typeof parsed.attr[6] == 'object' && parsed.attr[6] !== null, '8th member is a plain object')
  t.ok(parsed.attr[4].length === 2, '9th member is also a tuple')
  console.log(JSON.stringify(parsed.attr, null, 2))
})

test('test aws arc by parsing mock-arc', t => {
  t.plan(1)
  var mock = fs.readFileSync('./test/mock/aws.arc').toString()
  var parsed = parse(mock)
  t.ok(parsed, 'parsed mock')
  console.log(JSON.stringify(parsed, null, 2))
})

test('@scheduled', t => {
  t.plan(1)
  var mock = fs.readFileSync('./test/mock/scheduled.arc').toString()
  var parsed = parse(mock)
  t.ok(parsed, 'read out scheduled')
  console.log(parsed)
})
