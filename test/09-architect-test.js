let { test } = require('node:test')
let fs = require('fs')
let path = require('path')
let parse = require('../')

test('test base mock file', t => {
  t.plan(12)
  let pathToMock = path.join(__dirname, 'mock', 'simple.arc')
  let mock = fs.readFileSync(pathToMock).toString()
  let tokens = parse.lexer(mock)
  let ast = parse.parser(tokens)
  let parsed = parse.compiler(ast)
  t.assert.ok(parsed, 'parsed mock')
  // eslint-disable-next-line
  t.assert.ok(parsed.hasOwnProperty('attr'), 'has attr')
  t.assert.ok(Array.isArray(parsed.attr), 'attr is array')
  t.assert.ok(parsed.attr[0] === 'single', "1st member is string 'single'")
  t.assert.ok(parsed.attr[1] === false, '2nd member is a false')
  t.assert.ok(parsed.attr[2] === 1, '3rd member is a 1')
  t.assert.ok(parsed.attr[3] === -1, '4th member is a 1')
  t.assert.ok(Array.isArray(parsed.attr[4]), '5th member is an array with two members')
  t.assert.ok(parsed.attr[4].length === 2, '6th member is a tuple')
  t.assert.ok(parsed.attr[5].length === 7, '7th member is a vector of seven members')
  t.assert.ok(typeof parsed.attr[6] === 'object' && parsed.attr[6] !== null, '8th member is a plain object')
  t.assert.ok(parsed.attr[4].length === 2, '9th member is also a tuple')
})

test('test aws arc by parsing mock-arc', t => {
  t.plan(1)
  var mock = fs.readFileSync(path.join(__dirname, 'mock', 'aws.arc')).toString()
  var parsed = parse(mock)
  t.assert.ok(parsed, 'parsed mock')
  // console.log(JSON.stringify(parsed, null, 2))
})

test('@scheduled', t => {
  t.plan(1)
  var mock = fs.readFileSync(path.join(__dirname, 'mock', 'scheduled.arc')).toString()
  var parsed = parse(mock)
  t.assert.ok(parsed, 'read out scheduled')
  // console.log(parsed)
})

test('Test full Architect project manifest mock', t => {
  let pragmas = [
    'app',
    'aws',
    'static',
    'http',
    'proxy',
    'ws',
    'events',
    'scheduled',
    'queues',
    'tables',
    'indexes',
  ]
  t.plan(1 + (pragmas.length * 2))
  let mock = fs.readFileSync(path.join(__dirname, 'mock', 'arc.arc')).toString()
  let arc = parse(mock)
  t.assert.ok(arc, 'parsed mock')
  let pragmaConfig = {
    app: 1,
    aws: 12,
    static: 8,
    http: 9,
    proxy: 3,
    ws: 0,
    events: 2,
    scheduled: 1,
    queues: 3,
    tables: 2,
    indexes: 2,
  }
  let isArray = i => Array.isArray(i)
  for (const pragma of pragmas) {
    t.assert.ok(isArray(arc[pragma]), `${pragma} parsed to array`)
    t.assert.equal(arc[pragma].length, pragmaConfig[pragma], `${pragma} has ${arc[pragma].length} items`)
  }
})
