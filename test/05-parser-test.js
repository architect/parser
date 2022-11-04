let test = require('tape')
let lex = require('../src/lexer')
let parse = require('../src/parser')
let compile = require('../src/compiler')

test('lex, parse and compile', t => {
  t.plan(3)
  t.ok(lex, 'lex')
  t.ok(parse, 'parse')
  let arcfile = `
# comment with spaces
@pragma1
str
true
1

@gram
one 2 false`
  let tokens = lex(arcfile)
  let ast = parse(tokens)
  let arc = compile(ast)
  t.ok(Array.isArray(arc.pragma1), 'parsed')
})

test('vertical vector', t => {
  t.plan(1)
  let arcfile = `
@simple
vert
  one
  two
  three
`
  let tokens = lex(arcfile)
  let ast = parse(tokens)
  let arc = compile(ast)
  t.ok(arc.simple[0].vert.length === 3)
})

test('anon vertical', t => {
  t.plan(3)
  let arcfile = `
@anon
one two three
right 1 2 3
true false
`
  let tokens = lex(arcfile)
  let ast = parse(tokens)
  let arc = compile(ast)
  t.ok(arc.anon[0].length === 3)
  t.ok(arc.anon[1].length === 4)
  t.ok(arc.anon[2].length === 2)
})

test('map', t => {
  t.plan(5)
  let arcfile = `
@whales
orca
  name fin
  awesome true
  foods seals otters fishes`
  let tokens = lex(arcfile)
  let ast = parse(tokens)
  let arc = compile(ast)
  t.ok(Array.isArray(arc.whales) && arc.whales.length === 1, 'arc.whales')
  t.ok(arc.whales[0].orca, 'arc.whales[0].orca')
  t.ok(arc.whales[0].orca.name, 'fin')
  t.ok(arc.whales[0].orca.awesome, 'awesome')
  t.ok(Array.isArray(arc.whales[0].orca.foods), 'yum')
  console.dir({ arc }, { depth: null })
})

test('map with vector', t => {
  t.plan(5)
  let arcfile = `
@animals
cats
  house
    tabby
    tortoise
  jungle
    tiger
    lion
  ocean
    sealion`
  let tokens = lex(arcfile)
  let ast = parse(tokens)
  let arc = compile(ast)
  t.ok(Array.isArray(arc.animals))
  t.ok(arc.animals[0].cats)
  t.ok(arc.animals[0].cats.house.length === 2)
  t.ok(arc.animals[0].cats.jungle.length === 2)
  t.ok(arc.animals[0].cats.ocean === 'sealion')
  console.dir({ arc }, { depth: null })
})

test('funky trailing whitespace in complex formats', t => {
  t.plan(3)
  let arcfile
  function run () {
    let tokens = lex(arcfile)
    let ast = parse(tokens)
    compile(ast)
  }

  arcfile = `
@simple
vert
  one
  two
  three
    `
  t.doesNotThrow(run, 'Did not throw')

  arcfile = `
@whales
orca
  name fin
    `
  t.doesNotThrow(run, 'Did not throw')

  arcfile = `
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
  t.doesNotThrow(run, 'Did not throw')
})

test('AST quote information is retained', t => {
  t.plan(1)
  let arcfile = `@hi\n"there"`
  let tokens = lex(arcfile)
  let ast = parse(tokens)
  let str = ast.values[0].values.find(v => v.type === 'string' && v.quote && v.quote === '"')
  t.ok(str, 'found the quote on a string value')
  console.dir(str, { depth: null })
})
