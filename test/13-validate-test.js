let path = require('path')
let test = require('tape')
let parse = require('../')

test('validation with JSON schema', t=> {
  t.plan(1)
  let output = parse.read({cwd: path.join(__dirname, 'mock', 'bad')})
  t.ok(Array.isArray(output.errors), 'parsed')
  console.log(output)
})

