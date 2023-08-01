let test = require('tape')
let { readFileSync } = require('fs')
let parse = require('../')
let expected = require('./mock/arc.json')

test('Should parse JSON with core Arc pragmas represented as arrays', t => {
  t.plan(1)
  let mock = readFileSync('./test/mock/arc-item-arrays.json').toString()
  let parsed = parse.json(mock)
  console.dir(parsed, { depth: null })
  t.same(parsed, expected, 'parsed json')
})

test('Should parse JSON with core Arc pragmas represented as objects', t => {
  t.plan(1)
  let mock = readFileSync('./test/mock/arc-item-objects.json').toString()
  let parsed = parse.json(mock)
  console.dir(parsed, { depth: null })
  t.same(parsed, expected, 'parsed json')
})

test('Should parse YAML (by way of JSON)', t => {
  t.plan(1)
  let mock = readFileSync('./test/mock/arc.yaml').toString()
  let parsed = parse.yaml(mock)
  console.dir(parsed, { depth: null })
  t.same(parsed, expected, 'parsed json')
})

test('Should serialize JSON to app.arc', t => {
  t.plan(2)
  let mock, parsed, result
  let expectedArc = readFileSync('./test/mock/parsed.arc').toString()
  if (process.platform.startsWith('win')) {
    expectedArc = expectedArc.replace(/\r/g, '')
  }

  mock = readFileSync('./test/mock/arc-item-arrays.json').toString()
  parsed = parse.json(mock)
  result = parse.stringify(parsed)
  console.dir(result, { depth: null })
  t.same(result, expectedArc, 'parsed json')

  mock = readFileSync('./test/mock/arc-item-objects.json').toString()
  parsed = parse.json(mock)
  result = parse.stringify(parsed)
  console.dir(result, { depth: null })
  t.same(result, expectedArc, 'parsed json')
})
