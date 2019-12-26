let test = require('tape')
let {lexer, parser} = require('../')

test('indexes', t=> {
  t.plan(1)
  let arcfile = `
@tables
accounts
  accountID *String

hey
  foo
  bar
  baz

@indexes
accounts
  email *String
  `
  let tokens = lexer(arcfile)
  let result = parser(tokens)
  t.ok({}.hasOwnProperty.call(result, 'indexes'), 'has indexes')
  console.log(JSON.stringify(result, null, 2))
})
