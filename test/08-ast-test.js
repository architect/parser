let test = require('tape')
let parse = require('../')
let isVector = require('../src/ast/_is-vector')

/**
 * ast nodes have the following required properties: type, line, column
 *
 * ast nodes have the following optional properties: name, value, values, raw
 *
 * types are loosely grouped 'empty', 'scalar' and 'complex' or 'compound' types
 *
 * empty types (always have a value property)
 *
 * - newline
 * - comment
 * - space
 * - ex. { type: 'comment', value: '# hello' }
 *
 * scalar types (always have a value property)
 *
 * - string
 * - number
 * - boolean
 * - ex. { type: 'string', value: 'hi' }
 *
 * complex or compound types (always have a raw and values property; often have a name property)
 *
 * - arcfile
 *   - can only be the root node
 *   - can only contain pragma and empty nodes
 *   - pragma must be unique
 *   - must contain at least one pragma
 *   - ex. { type: 'arcfile', values: [{ type: 'pragma', name: 'example', values: [] }] }
 * - pragma
 *   - has name property
 *   - raw will contain full text including any inline comment
 *   - values can be empty and scalar types
 *   - values can also array, vector, and map
 *   - ex. { type: 'pragma', name: 'example', raw: 'example # w comment', values: []}
 * - array
 *   - can only contain empty and scalar values
 *   - ex. { type: 'array', values: [{type: 'newline', value: '\n'}, {type:'number', value: 2}, {type:'string', value: 'hi'}]}
 * - vector
 *   - can only contain empty and scalar values
 *   - has name property
 *   - raw property will contain full text including comments
 *   - { type: 'vector', name: 'stuff', values: []}
 * - map
 *   - can only contain empty and key values
 *   - has name property
 *   - raw property will contain full text including comments
 *   - { type: 'map', name: 'cats', values: [{type: 'key', name: 'catID', values: []}]}
 * - key
 *   - can only belong to a map!
 *   - can only contain empty and scalar values
 *   - can also contain array, and vector values (this is the deepest nesting allowed by arcfiles)
 *   - if raw present it forces newline
 *   - has name property
 */

test('ast empty', t => {
  t.plan(1)

  let mock = `
# comment1
@basic # comment2
  # comment3`

  let expected = {
    type: 'arcfile',
    values: [
      { type: 'newline', value: '\n', line: 1, column: 1 },
      { type: 'comment', value: '# comment1', line: 2, column: 1 },
      { type: 'newline', value: '\n', line: 2, column: 11 },
      {
        type: 'pragma',
        name: 'basic',
        raw: 'basic # comment2',
        line: 3,
        column: 1,
        values: [
          { type: 'newline', value: '\n', line: 3, column: 18 },
          { type: 'space', value: ' ', line: 4, column: 1 },
          { type: 'space', value: ' ', line: 4, column: 2 },
          { type: 'comment', value: '# comment3', line: 4, column: 3 },
          { type: 'newline', value: '\n', line: 4, column: 13 }
        ]
      }
    ]
  }

  let parsed = parse.ast(parse.lexer(mock))
  console.dir(parsed, { depth: null })
  t.same(parsed, expected, 'successfully parsed ast for empty types')
})

test('ast scalars', t => {
  t.plan(1)

  let mock = `
# comment
@pragma #comment2
# comment3
str
2
true`

  let expected = {
    type: 'arcfile',
    values: [
      { type: 'newline', value: '\n', line: 1, column: 1 },
      { type: 'comment', value: '# comment', line: 2, column: 1 },
      { type: 'newline', value: '\n', line: 2, column: 10 },
      {
        type: 'pragma',
        name: 'pragma',
        raw: 'pragma #comment2',
        line: 3,
        column: 1,
        values: [
          { type: 'newline', value: '\n', line: 3, column: 18 },
          { type: 'comment', value: '# comment3', line: 4, column: 1 },
          { type: 'newline', value: '\n', line: 4, column: 11 },
          { type: 'string', value: 'str', line: 5, column: 1 },
          { type: 'newline', value: '\n', line: 5, column: 4 },
          { type: 'number', value: 2, line: 6, column: 1 },
          { type: 'newline', value: '\n', line: 6, column: 2 },
          { type: 'boolean', value: true, line: 7, column: 1 },
          { type: 'newline', value: '\n', line: 7, column: 5 }
        ]
      }
    ]
  }

  let parsed = parse.ast(parse.lexer(mock))
  console.dir(parsed, { depth: null })
  t.same(parsed, expected, 'successfully parsed ast for scalar types')
})

test('ast arrays', t => {
  t.plan(1)
  let mock = `

# comment
@pragma
one true 3 # comment2`

  let expected = {
    type: 'arcfile',
    values: [
      { type: 'newline', value: '\n', line: 1, column: 1 },
      { type: 'newline', value: '\n', line: 2, column: 1 },
      { type: 'comment', value: '# comment', line: 3, column: 1 },
      { type: 'newline', value: '\n', line: 3, column: 10 },
      {
        type: 'pragma',
        name: 'pragma',
        raw: 'pragma',
        line: 4,
        column: 1,
        values: [
          { type: 'newline', value: '\n', line: 4, column: 8 },
          {
            type: 'array',
            line: 5,
            column: 1,
            values: [
              { type: 'string', value: 'one', line: 5, column: 1 },
              { type: 'space', value: ' ', line: 5, column: 4 },
              { type: 'boolean', value: true, line: 5, column: 5 },
              { type: 'space', value: ' ', line: 5, column: 9 },
              { type: 'number', value: 3, line: 5, column: 10 },
              { type: 'space', value: ' ', line: 5, column: 11 },
              {
                type: 'comment',
                value: '# comment2',
                line: 5,
                column: 12
              },
              { type: 'newline', value: '\n', line: 5, column: 22 }
            ]
          }
        ]
      }
    ]
  }

  let parsed = parse.ast(parse.lexer(mock))
  console.dir(parsed, { depth: null })
  t.same(parsed, expected, 'successfully parsed array')
})

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
  t.ok(isVector(start), 'found a valid vector')
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
  values`

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
                column: 3
              },
              { type: 'newline', value: '\n', line: 8, column: 13 },
              { type: 'space', value: ' ', line: 9, column: 1 },
              { type: 'space', value: ' ', line: 9, column: 2 },
              { type: 'string', value: 'values', line: 9, column: 3 },
              { type: 'newline', value: '\n', line: 9, column: 9 }
            ]
          }
        ]
      }
    ]
  }

  let parsed = parse.ast(parse.lexer(mock))
  console.dir(parsed, { depth: null })
  t.same(parsed, expected, 'successfully parsed vector')
})

/* final boss!
test('ast should parse maps', t => {
  t.plan(1)

  let mock = `
# comment1
@pragma
# comment2
mappy #comment3
  k1 val
  # comment4
  one true #comment5
  vec1 1 2 3
  vec2 # comment6
    one # comment7
    # comment8
    2
    false`

  let expected = {
    type: 'arcfile',
    nodes: [
      { type: 'newline' },
      { type: 'comment', value: '# comment1' },
      { type: 'newline' },
      { type: 'pragma', raw: '@pragma', values: [
        { type: 'comment', value: '# comment2' },
        { type: 'newline' },
        { type: 'map', name: 'mappy', raw: 'mappy #comment3', values: [
          { type: 'key', name: 'k1', values: [
            { type: 'string', value: 'val' }
          ]},
          { type: 'newline' },
          { type: 'comment', value: '# comment4' },
          { type: 'newline' },
          { type: 'key', name: 'one', values: [
            { type: 'boolean', value: true },
            { type: 'space' },
            { type: 'comment', value: '#comment5'}
          ]},
          { type: 'key', name: 'vec1', values: [
            { type: 'number', value: 1 },
            { type: 'space' },
            { type: 'number', value: 2 },
            { type: 'space' },
            { type: 'number', value: 3 },
          ]},
          { type: 'key', name: 'vec2', raw: 'vec2 # comment6', values: [
            { type: 'string', value: 'one' },
            { type: 'space' },
            { type: 'comment' value: '# comment7' },
            { type: 'newline' },
            { type: 'comment' value: '# comment8' },
            { type: 'newline' },
            { type: 'number', value: 2 },
            { type: 'newline' },
            { type: 'boolean', value: false }
          ]}
        ]}
      ]}
    ]
  }
  //let parsed = parse.ast(mock)
  //assert.deepEqual(parsed, expected)
  //t.pass('successfully parsed ast for scalar types')
  //console.dir(parsed, { depth: null })
})
*/
