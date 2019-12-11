let path = require('path')
let test = require('tape')
let parse = require('../')

test('validation with bad JSON schema', t=> {
  t.plan(1)
  let output = parse.read({cwd: path.join(__dirname, 'mock', 'bad')})
  t.ok(Array.isArray(output.errors), 'parsed')
  console.log(JSON.stringify(output, null, 2))
  console.log(`errors: ${output.errors.length}`)
})

test('validation with good JSON schema', t=> {
  t.plan(1)
  let output = parse.read({cwd: path.join(__dirname, 'mock', 'good')})
  t.ok(output.errors === false, 'parsed')
  console.log(JSON.stringify(output, null, 2))
})
