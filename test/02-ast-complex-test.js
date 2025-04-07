let { test } = require('node:test')
let parse = require('../')
let isVector = require('../src/parser/_is-vector')
let isMap = require('../src/parser/_is-map')

test('isVector', t => {
  t.plan(1)
  let mock = `
@vector-test
vec   # hi
  one  # uh oh
  2
  # what about now
  true
 some stuff here`
  let tokens = parse.lexer(mock)
  let start = tokens.slice(3, tokens.length) // start at 'vec'
  t.assert.ok(isVector(start), 'found a valid vector')
})

test('is not a vector', t => {
  t.plan(1)
  let mock = `
@is-vec-test
map
  one two`
  let tokens = parse.lexer(mock)
  let start = tokens.slice(3, tokens.length) // start at 'map' token
  t.assert.ok(isVector(start) === false, 'did not find a valid vector')
})

test('ast vectors', t => {
  t.plan(1)

  let mock = `
# comment1
@pragma
# comment2
named # comment3
  vector
  of
  # comment4
  values
this should be ignored`

  let expected = {
    type: 'arcfile',
    values: [
      { type: 'newline', value: '\n', line: 1, column: 1 },
      { type: 'comment', value: '# comment1', line: 2, column: 1 },
      { type: 'newline', value: '\n', line: 2, column: 11 },
      {
        type: 'pragma',
        name: 'pragma',
        raw: 'pragma',
        line: 3,
        column: 1,
        values: [
          { type: 'newline', value: '\n', line: 3, column: 8 },
          { type: 'comment', value: '# comment2', line: 4, column: 1 },
          { type: 'newline', value: '\n', line: 4, column: 11 },
          {
            type: 'vector',
            name: 'named',
            raw: 'named # comment3',
            values: [
              { type: 'space', value: ' ', line: 6, column: 1 },
              { type: 'space', value: ' ', line: 6, column: 2 },
              { type: 'string', value: 'vector', line: 6, column: 3 },
              { type: 'newline', value: '\n', line: 6, column: 9 },
              { type: 'space', value: ' ', line: 7, column: 1 },
              { type: 'space', value: ' ', line: 7, column: 2 },
              { type: 'string', value: 'of', line: 7, column: 3 },
              { type: 'newline', value: '\n', line: 7, column: 5 },
              { type: 'space', value: ' ', line: 8, column: 1 },
              { type: 'space', value: ' ', line: 8, column: 2 },
              {
                type: 'comment',
                value: '# comment4',
                line: 8,
                column: 3,
              },
              { type: 'newline', value: '\n', line: 8, column: 13 },
              { type: 'space', value: ' ', line: 9, column: 1 },
              { type: 'space', value: ' ', line: 9, column: 2 },
              { type: 'string', value: 'values', line: 9, column: 3 },
              { type: 'newline', value: '\n', line: 9, column: 9 },
            ],
          },
          {
            type: 'array',
            line: 10,
            column: 1,
            values: [
              { type: 'string', value: 'this', line: 10, column: 1 },
              { type: 'space', value: ' ', line: 10, column: 5 },
              { type: 'string', value: 'should', line: 10, column: 6 },
              { type: 'space', value: ' ', line: 10, column: 12 },
              { type: 'string', value: 'be', line: 10, column: 13 },
              { type: 'space', value: ' ', line: 10, column: 15 },
              { type: 'string', value: 'ignored', line: 10, column: 16 },
            ],
          },
        ],
      },
    ],
  }
  let parsed = parse.parser(parse.lexer(mock))
  // console.dir(parsed, { depth: null })
  t.assert.deepEqual(parsed, expected, 'successfully parsed vector')
})

test('isMap', t => {
  t.plan(1)
  let mock = `
@hi
map
  one two # fun
  three
    5
    6
    6
  `
  let tokens = parse.lexer(mock)
  let start = tokens.slice(3, tokens.length)
  // console.log(start)
  t.assert.ok(isMap(start))
})

test('map has three keys (vectors)', t => {
  t.plan(1)
  let mock = `
@map-test
m1 # also cool
  one 1 # cool
  two true
  three 3`
  let tokens = parse.lexer(mock)
  let ast = parse.parser(tokens)
  // console.dir(ast, { depth: null })
  let pragma = ast.values.find(t => t.type === 'pragma' && t.name === 'map-test')
  let map = pragma.values.find(t => t.type === 'map' && t.name === 'm1')
  let keys = map.values.filter(t => t.type === 'vector')
  t.assert.ok(keys.length === 3, 'has three keys')
})

test('map with vector', t => {
  t.plan(2)
  let mock = `
# comment1
@map-test
m1 #comment2
  vec # comment3
    one # comment4
    # comment5
    2
    false`
  let tokens = parse.lexer(mock)
  let mapTokens = tokens.slice(5, tokens.length)
  t.assert.ok(isVector(mapTokens) === false, 'isVector is false')
  t.assert.ok(isMap(mapTokens) === true, 'isMap is true')
  /* let parsed = */parse.parser(tokens)
  // console.dir(parsed, { depth: null })
})

test('map with scalars and vectors', t => {
  t.plan(2)
  let mock = `
# comment1
@map-test
m1 #comment2
  hey hi
  bools
    true
    false
  nums 1 2 3
  vec # comment3
    one # comment4
    # comment5
    2
    false`
  let tokens = parse.lexer(mock)
  let parsed = parse.parser(tokens)
  let pragma = parsed.values.find(t => t.type === 'pragma')
  let map = pragma.values.find(t => t.type === 'map')
  let keys = map.values.filter( t => t.type === 'vector')
  let bools = keys.find(t => t.name === 'bools')
  t.assert.ok(keys.length === 4, 'has four keys')
  t.assert.ok(bools.values.filter(t => t.type === 'boolean').length === 2, 'bools has two booleans')
  // console.dir(parsed, { depth: null })
})
