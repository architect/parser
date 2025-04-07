let test = require('node:test')
let lex = require('../src/lexer')

let arcfile = `

@pragma1
str
str1 str2
get /foo/bar/baz.buzz
1 2 3
777.78
true #comment
false false false

# comment with spaces
foo bar

#semi;colons?
`

test('lex', t => {
  t.plan(5)

  // can lex
  t.assert.ok(lex, 'exists')
  let result = lex(arcfile)

  // got an array
  t.assert.ok(Array.isArray(result), 'lexed')
  let first = result[0]
  let second = result[1]
  let third = result[2]

  // ensure the arcfile parses as we'd expect
  t.assert.ok(first.type === 'newline' && first.line === 1 && first.column === 1, 'line 1 column 1 is a newline')
  t.assert.ok(second.type === 'newline' && second.line === 2 && first.column === 1, 'line 2 column 1 is a newline')
  t.assert.ok(third.type === 'pragma' && third.value === 'pragma1' && third.line === 3 && third.column === 1, 'hunp')
})
