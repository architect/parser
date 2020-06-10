let test = require('tape')
let fs = require('fs')
let parse = require('../')

test('Test full Architect project manifest mock', t=> {
  let mock = fs.readFileSync('./test/mock/arc.arc').toString()
  let arc = parse(mock)
  t.ok(arc, 'parsed mock')
  let pragmas = [
    'app',
    'aws',
    'static',
    'http',
    'ws',
    'events',
    'scheduled',
    'queues',
    'tables',
    'indexes'
  ]
  let pragmaConfig = {
    app: 1,
    aws: 4,
    static: 8,
    http: 5,
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
