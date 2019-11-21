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

test('floats', t=> {
  t.plan(2)
  let arcfile = `
@floats
39239392.32232332
2323.323232

@quoted-hash
"invoice-#333"
`
  t.ok(arcfile, '.arc')
  console.log(arcfile)
  let output = parse(arcfile)
  t.ok(output, 'parsed result')
  console.log(JSON.stringify(output, null, 2))
})



  /*
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
})*/
