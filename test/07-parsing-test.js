let test = require('tape')
let fs = require('fs')
let assert = require('assert-diff')
let parse = require('../')
let expected = require('./_mock-arc-object')

test('Should parse JSON with core Arc pragmas represented as arrays', t => {
  t.plan(1)
  let mock = fs.readFileSync('./test/mock/arc-item-arrays.json').toString()
  let parsed = parse.json(mock)
  assert.deepEqual(parsed, expected)
  t.pass('parsed json')
  console.dir(parsed, { depth: null })
})

test('Should parse JSON with core Arc pragmas represented as objects', t => {
  t.plan(1)
  let mock = fs.readFileSync('./test/mock/arc-item-objects.json').toString()
  let parsed = parse.json(mock)
  assert.deepEqual(parsed, expected)
  t.pass('parsed json')
  console.dir(parsed, { depth: null })
})

test('Should parse YAML', t => {
  t.plan(1)
  let mock = fs.readFileSync('./test/mock/arc.yaml').toString()
  let parsed = parse.yaml(mock)
  assert.deepEqual(parsed, expected)
  t.pass('parsed json')
  console.dir(parsed, { depth: null })
})

// TODO test for actual TOML data shape but I just don't care enough to learn how to represent this stuff in TOML right now
test('parse.toml', t => {
  t.plan(1)
  let mock = fs.readFileSync('./test/mock/arc.toml').toString()
  let parsed = parse.toml(mock)
  t.ok(parsed, 'parsed yaml')
  console.log(parsed)
})

test('should serialize json to app.arc', t => {
  t.plan(2)
  let mock = fs.readFileSync('./test/mock/arc-item-arrays.json', 'utf-8')
  let parsed = parse.json(mock)
  let result = parse.stringify(parsed)
  t.ok(result, 'parsed json')

  mock = fs.readFileSync('./test/mock/arc-item-objects.json', 'utf-8')
  parsed = parse.json(mock)
  result = parse.stringify(parsed)
  t.ok(result, 'parsed json')
})
