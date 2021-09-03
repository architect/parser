let test = require('tape')
let lex = require('../src/lexer')
let parse = require('../src/ast')

let arcfile = `
# comment with spaces
@pragma1  
str
true
1

@gram
one 2 false
`

test('lex and parse', t => {
  t.plan(3)
  t.ok(lex, 'lex')
  t.ok(parse, 'parse')
  let tokens = lex(arcfile)
  let arc = parse(tokens)
  t.ok(Array.isArray(arc.pragma1), 'parsed')
  console.log(arcfile, arc)
})

test('vertical vector', t => {
  t.plan(1)
  t.ok(true, 'ok')
  let arc = `
@simple
vert
  one
  two
  three
`
  let lexed = lex(arc)
  let parsed = parse(lexed)
  console.log(arc, lexed, JSON.stringify(parsed, null, 2))
})

test('anon vertical', t => {
  t.plan(1)
  let arc = `
@anon
one two three
right 1 2 3
true false
`
  let lexed = lex(arc)
  let parsed = parse(lexed)
  t.ok(true, 'ok')
  console.log(arc, lexed, JSON.stringify(parsed, null, 2))
})

test('map', t => {
  t.plan(5)
  let arc = `
@whales
orca
  name fin
  awesome true
  foods seals otters fishes
`
  let lexed = lex(arc)
  let parsed = parse(lexed)
  t.ok(Array.isArray(parsed.whales) && parsed.whales.length === 1, 'arc.whales')
  t.ok(parsed.whales[0].orca, 'arc.whales[0].orca')
  t.ok(parsed.whales[0].orca.name, 'fin')
  t.ok(parsed.whales[0].orca.awesome, 'awesome')
  t.ok(Array.isArray(parsed.whales[0].orca.foods), 'yum')
  console.log(JSON.stringify(parsed, null, 2))
})

test('map with vector', t => {
  t.plan(1)
  let arc = `
@animals
cats
  house
    tabby
    tortoise
  jungle
    tiger
    lion
  ocean
    sealion
`
  let lexed = lex(arc)
  let parsed = parse(lexed)

  t.ok(true, 'ok')
  console.log(JSON.stringify(parsed, null, 2))
})
