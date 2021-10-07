let test = require('tape')
let parse = require('../')

test('can compile scalar values', t => {
  t.plan(1)
  let arcfile = `
# yaaaa
@hello # hi
world
# hello
2
true`
  let tokens = parse.lexer(arcfile)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast)
  t.same(arc, { hello: [ 'world', 2, true ] })
  console.log(arc)
})

test('can compile array values', t => {
  t.plan(1)
  let arcfile = `
@hello
one 2 true`
  let tokens = parse.lexer(arcfile)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast)
  t.same(arc, { hello: [ [ 'one', 2, true ] ] })
  console.log(arc)
})

test('can compile scalar and array values', t => {
  t.plan(1)
  let arcfile = `
@hello
world
two
false
one 2 true`
  let tokens = parse.lexer(arcfile)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast)
  t.same(arc, { hello: [ 'world', 'two', false, [ 'one', 2, true ] ] })
  console.log(arc)
})

test('can compile vector', t => {
  t.plan(1)
  let arcfile = `
@hello
hi
  world`
  let tokens = parse.lexer(arcfile)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast)
  t.same(arc, { hello: [ { hi: [ 'world' ] } ] })
  console.dir(arc, { depth: null })
})

test('can compile map', t => {
  t.plan(1)
  let arcfile = `
@pets
cat
  name sutro`
  let tokens = parse.lexer(arcfile)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast)
  t.same(arc, { pets: [ { cat: { name: 'sutro' } } ] })
  console.dir(arc, { depth: null })
})

test('can compile map with vector', t => {
  t.plan(1)
  let arcfile = `
@pets
cat
  names
    sutr0
    tux3d0`
  let tokens = parse.lexer(arcfile)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast)
  t.same(arc, {
    pets: [
      { cat: { names: [ 'sutr0', 'tux3d0' ] } }
    ]
  })
  console.dir(arc, { depth: null })
})

test('can compile a simple arc plaintext string', t => {
  t.plan(1)
  let origin = `
# hello world
@hi
hello 1 true`
  let tokens = parse.lexer(origin)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast, 'arc')
  t.ok(arc === origin)
})

test('can compile arc plaintext string with vector', t => {
  t.plan(1)
  let origin = `
# hello world
@hi
hello
  is
  it # you are looking for
  me`
  let tokens = parse.lexer(origin)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast, 'arc')
  t.ok(arc === origin)
})

test('can compile arc plaintext string with map', t => {
  t.plan(1)
  let origin = `
# hello world
@hi
hello
  one 1 # some comment here
  two false`
  let tokens = parse.lexer(origin)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast, 'arc')
  t.ok(arc === origin)
})

test('can compile arc plaintext string with map with vector', t => {
  t.plan(1)
  let origin = `
# hello world
@hi
hello
  one 1 # some comment here
  two false
  three
    4
    5
    6`
  let tokens = parse.lexer(origin)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast, 'arc')
  console.log(origin, arc)
  t.ok(arc === origin)
})

test('line breaks are preserved across all primitive types', t => {
  t.plan(1)
  let origin = `@a
scalar



true



123



map
  a b



vector
  a
  b



array a b



@b
scalar



true



123



map
  a b



vector
  a
  b



array a b
`
  let tokens = parse.lexer(origin)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast, 'arc')
  t.ok(arc === origin)
})

test('can compile simple yaml string', t => {
  t.plan(1)
  let origin = `
@hi
hello 1 true
#wut`
  let expected = `
hi:
- [ hello, 1, true ]
#wut`
  let tokens = parse.lexer(origin)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast, 'yaml')
  t.same(arc, expected)
})
