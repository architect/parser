let { test } = require('node:test')
let parse = require('../')

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
        ],
      },
    ],
  }

  let parsed = parse.parser(parse.lexer(mock))
  // console.dir(parsed, { depth: null })
  t.assert.deepEqual(parsed, expected, 'successfully parsed ast for empty types')
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
        ],
      },
    ],
  }

  let parsed = parse.parser(parse.lexer(mock))
  // console.dir(parsed, { depth: null })
  t.assert.deepEqual(parsed, expected, 'successfully parsed ast for scalar types')
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
                column: 12,
              },
            ],
          },
        ],
      },
    ],
  }

  let tokens = parse.lexer(mock)
  let parsed = parse.parser(tokens)
  // console.dir(parsed, { depth: null })
  t.assert.deepEqual(parsed, expected, 'successfully parsed array')
})
