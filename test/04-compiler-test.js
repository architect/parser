let { test } = require('node:test')
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
  t.assert.deepEqual(arc, { hello: [ 'world', 2, true ] })
  // console.log(arc)
})

test('can compile array values', t => {
  t.plan(1)
  let arcfile = `
@hello
one 2 true`
  let tokens = parse.lexer(arcfile)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast)
  t.assert.deepEqual(arc, { hello: [ [ 'one', 2, true ] ] })
  // console.log(arc)
})

test('can compile array values with quotes (js)', t => {
  t.plan(1)
  let arcfile = `
@bundles
my-package node_modules/my-package
store 'node_modules/@enhance/store'
ssr "node_modules/@enhance/ssr"`
  let tokens = parse.lexer(arcfile)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast)
  t.assert.deepEqual(arc, { bundles: [
    [ 'my-package', 'node_modules/my-package' ],
    [ 'store', 'node_modules/@enhance/store' ],
    [ 'ssr', 'node_modules/@enhance/ssr' ],
  ] })
  // console.log(arc)
})

test('can compile array values with quotes (arc)', t => {
  t.plan(3)
  let arcfile = `
@bundles
my-package node_modules/my-package
store 'node_modules/@enhance/store'
ssr "node_modules/@enhance/ssr"`
  let tokens = parse.lexer(arcfile)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast, 'arc')
  t.assert.ok(arc.includes(`my-package node_modules/my-package`))
  t.assert.ok(arc.includes(`store 'node_modules/@enhance/store'`))
  t.assert.ok(arc.includes(`ssr "node_modules/@enhance/ssr"`))
  // console.log(arc)
})

test('can compile array values with quotes (yaml)', t => {
  t.plan(3)
  let arcfile = `
@bundles
my-package node_modules/my-package
store 'node_modules/@enhance/store'
ssr "node_modules/@enhance/ssr"`
  let tokens = parse.lexer(arcfile)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast, 'yaml')
  t.assert.ok(arc.includes(`my-package, node_modules/my-package`))
  t.assert.ok(arc.includes(`store, 'node_modules/@enhance/store'`))
  t.assert.ok(arc.includes(`ssr, "node_modules/@enhance/ssr"`))
  // console.log(arc)
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
  t.assert.deepEqual(arc, { hello: [ 'world', 'two', false, [ 'one', 2, true ] ] })
  // console.log(arc)
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
  t.assert.deepEqual(arc, { hello: [ { hi: [ 'world' ] } ] })
  // console.dir(arc, { depth: null })
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
  t.assert.deepEqual(arc, { pets: [ { cat: { name: 'sutro' } } ] })
  // console.dir(arc, { depth: null })
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
  t.assert.deepEqual(arc, {
    pets: [
      { cat: { names: [ 'sutr0', 'tux3d0' ] } },
    ],
  })
  // console.dir(arc, { depth: null })
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
  t.assert.ok(arc === origin)
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
  t.assert.ok(arc === origin)
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
  t.assert.ok(arc === origin)
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
  // console.log(origin, arc)
  t.assert.ok(arc === origin)
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
# comment

# comment


true
# comment


123
# comment


map
  a b
  # comment
  c d
# comment

# comment

vector
  a
  # comment
  b
# comment


# comment

array a b
# comment


`
  let tokens = parse.lexer(origin)
  let ast = parse.parser(tokens)
  let arc = parse.compiler(ast, 'arc')
  t.assert.ok(arc === origin)
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
  t.assert.deepEqual(arc, expected)
})

test('js compilation strips escape quotes', t => {
  t.plan(3)
  let arcfile = `@bundles
mux-player 'node_modules/@mux/mux-player'
docsearch-js "node_modules/@docsearch/js"
docsearch-css \`node_modules/@docsearch/css/dist/style.css\``
  let tokens = parse.lexer(arcfile)
  let ast = parse.parser(tokens)
  let js = parse.compiler(ast, 'js')
  let first = js.bundles[0][1]
  let second = js.bundles[1][1]
  let third = js.bundles[2][1]
  t.assert.ok(first.includes("'") === false)
  t.assert.ok(second.includes('"') === false)
  t.assert.ok(third.includes('`') === false)
  // console.dir([ first, second, third ], { depth: null })
})

test('js compilation does not strip heterogenous quotes in a string literal', t => {
  t.plan(6)
  let arcfile = `@bundles
hello '\`howdy\`'
hello '"howdy"'
hello "\`howdy\`"
hello "'howdy'"
hello \`'howdy'\`
hello \`"howdy"\`
`
  let tokens = parse.lexer(arcfile)
  let ast = parse.parser(tokens)
  let js = parse.compiler(ast, 'js')
  t.assert.equal(js.bundles[0][1], '\`howdy\`', 'Single quoted string literal returned string with escaped backticks')
  t.assert.equal(js.bundles[1][1], '"howdy"', 'Single quoted string literal returned string with escaped double quotes')
  t.assert.equal(js.bundles[2][1], '\`howdy\`', 'Double quoted string literal returned string with escaped backticks')
  t.assert.equal(js.bundles[3][1], "'howdy'", 'Double quoted string literal returned string with escaped single quotes')
  t.assert.equal(js.bundles[4][1], `'howdy'`, 'Backtick quoted string literal returned string with escaped single quotes')
  t.assert.equal(js.bundles[5][1], `"howdy"`, 'Backtick quoted string literal returned string with escaped double quotes')
})
