var test = require('tape')
var fs = require('fs')
var parse = require('../')

test('arc file must start with an @section', t => {
  t.plan(1)
  var mock = fs.readFileSync('./test/mock/invalid.arc').toString()
  try {
    parse(mock)
    t.fail('no opening @')
  }
  catch (e) {
    t.ok(e, 'failed on bad input')
    console.log(e)
  }
})

test('@section must be non whitespace', t => {
  t.plan(1)
  var mock = fs.readFileSync('./test/mock/invalid2.arc').toString()
  try {
    var parsed = parse(mock)
    t.fail('ruh roh')
    console.log(parsed)
  }
  catch (e) {
    t.ok(e, 'failed on bad input')
    console.log(e)
  }
})

test('objects name must be a string without spaces', t => {
  t.plan(1)
  var mock = fs.readFileSync('./test/mock/invalid3.arc').toString()
  try {
    var parsed = parse(mock)
    t.fail('ruh roh')
    console.log(parsed)
  }
  catch (e) {
    t.ok(e, 'failed on bad input')
    console.log(e)
  }
})

test('indents must follow a single (or double)', t => {
  t.plan(1)
  var mock = fs.readFileSync('./test/mock/invalid4.arc').toString()
  try {
    var parsed = parse(mock)
    t.fail('ruh roh')
    console.log(parsed)
  }
  catch (e) {
    t.ok(e, 'failed on bad input')
    console.log(e)
  }
})
