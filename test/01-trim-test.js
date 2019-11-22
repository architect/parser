let test = require('tape')
let lex = require('../src/lexer')
let trim = require('../src/parser/_compact')

let arcfile = `
# comment with spaces
@pragma
str
`

test('lex and trim left', t=> {
  t.plan(3)
  t.ok(lex, 'lex')
  t.ok(trim, 'trim')
  let raw = lex(arcfile)
  let tokens = trim(raw)
  t.ok(tokens[0].type === 'pragma', 'root is pragma')
  console.log('before-->', raw)
  console.log('after-->', tokens)
})
