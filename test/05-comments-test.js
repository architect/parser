let test = require('tape')
let fs = require('fs')
let parse = require('../')
let lex = require('../src/lexer')
let compact = require('../src/parser/_compact')

test('removed comments and parsed file', t => {
  t.plan(1)
  let mock = fs.readFileSync('./test/mock/comments.arc').toString()
  try {
    let parsed = parse(mock)
    t.ok(parsed, 'parsed file')
    console.log(JSON.stringify(parsed, null, 2))
  }
  catch (e) {
    t.fail(e)
    console.log(e)
  }
})

test('compact', t => {
  t.plan(1)
  let mock = fs.readFileSync('./test/mock/comments.arc').toString()
  let tokens = lex(mock)
  let parsed = compact(tokens)
  t.ok(parsed, 'parsed')
  console.log(parsed)
})
