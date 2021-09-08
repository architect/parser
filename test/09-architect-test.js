let test = require('tape')
let fs = require('fs')
let path = require('path')
let parse = require('../')

test.only('test base mock file', t => {
  t.plan(12)
  let pathToMock = path.join(__dirname, 'mock', 'simple.arc')
  let mock = fs.readFileSync(pathToMock).toString()
  let parsed = parse(mock)
  console.log(parsed)
  t.ok(parsed, 'parsed mock')
  // eslint-disable-next-line
  t.ok(parsed.hasOwnProperty('attr'), 'has attr')
  t.ok(Array.isArray(parsed.attr), 'attr is array')
  t.ok(parsed.attr[0] === 'single', "1st member is string 'single'")
  t.ok(parsed.attr[1] === false, '2nd member is a false')
  t.ok(parsed.attr[2] === 1, '3rd member is a 1')
  t.ok(parsed.attr[3] === -1, '4th member is a 1')
  t.ok(Array.isArray(parsed.attr[4]), '5th member is an array with two members')
  t.ok(parsed.attr[4].length === 2, '6th member is a tuple')
  t.ok(parsed.attr[5].length === 7, '7th member is a vector of seven members')
  t.ok(typeof parsed.attr[6] == 'object' && parsed.attr[6] !== null, '8th member is a plain object')
  t.ok(parsed.attr[4].length === 2, '9th member is also a tuple')
  console.log(JSON.stringify(parsed.attr, null, 2))
})

test('test aws arc by parsing mock-arc', t => {
  t.plan(1)
  var mock = fs.readFileSync(path.join(process.cwd(), 'test', 'mock', 'aws.arc')).toString()
  var parsed = parse(mock)
  t.ok(parsed, 'parsed mock')
  console.log(JSON.stringify(parsed, null, 2))
})

test('@scheduled', t => {
  t.plan(1)
  var mock = fs.readFileSync(path.join(process.cwd(), 'test', 'mock', 'scheduled.arc')).toString()
  var parsed = parse(mock)
  t.ok(parsed, 'read out scheduled')
  console.log(parsed)
})

test('Test full Architect project manifest mock', t => {
  let mock = fs.readFileSync(path.join(process.cwd(), 'test', 'mock', 'arc.arc')).toString()
  let arc = parse(mock)
  t.ok(arc, 'parsed mock')
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
    'indexes'
  ]
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
    indexes: 2
  }
  t.plan(1 + (pragmas.length * 2))
  let isArray = i => Array.isArray(i)
  pragmas.forEach(pragma => {
    t.ok(isArray(arc[pragma]), `${pragma} parsed to array`)
    t.equal(arc[pragma].length, pragmaConfig[pragma], `${pragma} has ${arc[pragma].length} items`)
  })
})
