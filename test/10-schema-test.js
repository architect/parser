const test = require('tape')
const fs = require('fs')
const lex = require('../src/lexer')
const parse = require('../')


test('check lex', t=> {
  t.plan(1)
  let tbl = `table
  type map
  min 1
  max 4
  required *:partition
  optional 
    *:sort 
    *:ttl 
    stream:boolean
  `
  let output = lex(tbl)
  t.ok(output, 'lexed')
  console.log(output)
})

test('parse.arc', t => {
  t.plan(1)
  t.ok(parse.arc, 'parse.arc is defined')
  //console.log(JSON.stringify(parse.arc(arcfile), null, 2))
  let mock = fs.readFileSync('./test/mock/schema.arc').toString()
  let parsed = parse(mock)
  console.log(JSON.stringify(parsed, null, 2))
  //let string = JSON.stringify(parsed)
  //let actual = JSON.stringify(parse(parse.stringify(parsed)))
  //t.equal(string, actual, 'Stringified parsed arc file 🙌')
})
