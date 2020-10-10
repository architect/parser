let path = require('path')
let test = require('tape')
let parse = require('../')

test('validation with bad JSON schema', t => {
  t.plan(1)
  let output = parse.read({ cwd: path.join(__dirname, 'mock', 'bad') })
  t.ok(output.errors.startsWith('Architect schema validation error'), 'parsed')
  console.log(JSON.stringify(output, null, 2))
  console.log(`errors: ${output.errors.length}`)
})

test('validation with good JSON schema', t => {
  t.plan(1)
  let output = parse.read({ cwd: path.join(__dirname, 'mock', 'good') })
  t.ok(output.errors === false, 'parsed')
  console.log(JSON.stringify(output, null, 2))
  console.log(parse(parse.stringify(output.arc)))
})

test('validation with correct JSON schema including @static with "ignore" setting', t => {
  t.plan(1)
  let output = parse.read({ cwd: path.join(__dirname, 'mock', 'good', 'static-ignore') })
  t.ok(output.errors === false, 'parsed with no errors')
})

test('validation with bad JSON schema against .arc-config', t => {
  t.plan(1)
  let cwd = path.join(__dirname, 'mock', 'bad', 'arc-config')
  let output = parse.readArcConfig({ cwd })
  t.ok(output.errors.startsWith('Architect schema validation error'), 'parsed')
  console.log(JSON.stringify(output, null, 2))
  console.log(`errors: ${output.errors.length}`)
})

test('validation with correct JSON schema against .arc-config', t => {
  t.plan(1)
  let cwd = path.join(__dirname, 'mock', 'good', 'arc-config')
  let output = parse.readArcConfig({ cwd })
  t.ok(output.errors === false, 'parsed with no errors')
})
