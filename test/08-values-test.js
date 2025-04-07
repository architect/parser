let { test } = require('node:test')
let parse = require('../')
let isVector = require('../src/parser/_is-vector')

test('parse quoted string', t => {
  t.plan(5)
  let arcfile = `
@mystr
"string with spaces"
\`string also with spaces\`
'yet another string w spaces'
`
  let output = parse(arcfile)
  t.assert.ok(output, 'parsed')
  t.assert.ok(Array.isArray(output.mystr), 'output.mystr')
  t.assert.ok(output.mystr[0] === 'string with spaces', 'greedy double quote')
  t.assert.ok(output.mystr[1] === 'string also with spaces', 'greedy backtick')
  t.assert.ok(output.mystr[2] === 'yet another string w spaces', 'greedy single quote')
})

test('parse quoted string with illegal chars', t => {
  t.plan(2)
  let arcfile = `
@mystr
"string with spaces 

    and otherwise '#illegal' <chars> b@brian.io"
`
  t.assert.ok(arcfile, '.arc')
  // console.log(arcfile)
  let output = parse(arcfile)
  t.assert.ok(output, 'parsed result')
  // console.log(output)
})

test('string[]', t => {
  t.plan(2)
  let arcfile = `
@mystr
"string with spaces " and another true 2
`
  t.assert.ok(arcfile, '.arc')
  // console.log(arcfile)
  let output = parse(arcfile)
  t.assert.ok(output, 'parsed result')
  // console.log(output)
})

test('obj str', t => {
  t.plan(2)
  let arcfile = `
@mystr
myobj
  mykey "string with spaces " and another true 2
`
  t.assert.ok(arcfile, '.arc')
  // console.log(arcfile)
  let output = parse(arcfile)
  t.assert.ok(output, 'parsed result')
  // console.log(JSON.stringify(output, null, 2))
})

test('floats and hashes; plus signals string; quoted values', t => {
  t.plan(2)
  let arcfile = `
@floats
39239392.32232332
-2323.323232

@quoted-hash
"invoice-#333"

@phone-number
+1-234-567-8900
asdf-787

@email
"b@brian.io"
`
  t.assert.ok(arcfile, '.arc')
  // console.log(arcfile)
  let output = parse(arcfile)
  t.assert.ok(output, 'parsed result')
  // console.log(JSON.stringify(output, null, 2))
})

test('isVec', t => {
  t.plan(1)
  let arcfile = `
@values
nested
  39239392.32232332
  -2323.323232
  +1-234-567-8900
  asdf-787
  true
  "b@brian.io"

obj
  "invoice-#333" value here
  wut wut`
  t.assert.ok(true)
  let tokens = parse.lexer(arcfile)
  let slice = tokens.slice(2, tokens.length)
  /* let isV = */isVector(slice)
  // console.dir({ slice, isV }, { depth: null })
})

test('nested floats and hashes; plus signals string; quoted values', t => {
  t.plan(8)
  let arcfile = `
@values
nested
  39239392.32232332
  -2323.323232
  +1-234-567-8900
  asdf-787
  true
  "b@brian.io"

obj
  "invoice-#333" value here
`
  t.assert.ok(arcfile, '.arc')
  // console.log(arcfile)
  let tokens = parse.lexer(arcfile)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast)
  t.assert.ok(arc)
  t.assert.ok(Array.isArray(arc.values), 'values pragma exists')
  t.assert.ok(Array.isArray(arc.values[0].nested), 'nested array exists')
  t.assert.ok(Number.isInteger(arc.values[0].nested[0]) === false, 'is a float')
  t.assert.ok(Math.sign(arc.values[0].nested[1]) === -1, 'is a negative value')
  t.assert.ok(Object.keys(arc.values[1].obj)[0] === 'invoice-#333', 'obj key exists')
  t.assert.ok(Array.isArray(arc.values[1].obj['invoice-#333']), 'obj key has expected value')
})
