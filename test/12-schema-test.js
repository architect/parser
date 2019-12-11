let test = require('tape')
let parse = require('../')

test('parse quoted string', t=> {
  t.plan(3)
  let output = parse(`
@mystr
"string with spaces"
`)
  t.ok(output, 'parsed')
  t.ok(Array.isArray(output.mystr), 'output.mystr')
  t.ok(output.mystr[0] === 'string with spaces', 'has string with spaces')
  console.log(output)
})

test('parse quoted string with illegal chars', t=> {
  t.plan(2)
  let arcfile = `
@mystr
"string with spaces 

    and otherwise '#illegal' <chars> b@brian.io"
`
  t.ok(arcfile, '.arc')
  console.log(arcfile)
  let output = parse(arcfile)
  t.ok(output, 'parsed result')
  console.log(output)
})

test('string[]', t=> {
  t.plan(2)
  let arcfile = `
@mystr
"string with spaces " and another true 2
`
  t.ok(arcfile, '.arc')
  console.log(arcfile)
  let output = parse(arcfile)
  t.ok(output, 'parsed result')
  console.log(output)
})

test('obj str', t=> {
  t.plan(2)
  let arcfile = `
@mystr
myobj
  mykey "string with spaces " and another true 2
`
  t.ok(arcfile, '.arc')
  console.log(arcfile)
  let output = parse(arcfile)
  t.ok(output, 'parsed result')
  console.log(JSON.stringify(output, null, 2))
})

test('floats and hashes; plus signals string; quoted values', t=> {
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
  t.ok(arcfile, '.arc')
  console.log(arcfile)
  let output = parse(arcfile)
  t.ok(output, 'parsed result')
  console.log(JSON.stringify(output, null, 2))
})

test('nested floats and hashes; plus signals string; quoted values', t=> {
  t.plan(2)
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
  t.ok(arcfile, '.arc')
  console.log(arcfile)
  let output = parse(arcfile)
  t.ok(output, 'parsed result')
  console.log(JSON.stringify(output, null, 2))
})
