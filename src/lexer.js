let {
  SPACE,
  NEWLINE,
  PRAGMA,
  COMMENT,
  STRING,
  NUMBER,
  BOOLEAN
} = require('./_regexp')

let peek = require('./_peek')

/**
 * tokenizes code including spaces and newlines (which are significant) and comments (which are not)
 *
 * @param {string} code
 * @returns {array} tokens [{type, value, line, column}]
 */
module.exports = function lex(code) {

  // state bag for our tokens
  let tokens = []

  // counters
  let cursor = 0
  let line = 1
  let column = 1

  // stream the code one character at a time
  while (cursor < code.length) {

    if (PRAGMA.test(code[cursor])) {
      let token = peek.pragma(cursor, code)
      tokens.push({
        type: 'pragma',
        value: token.substring(1),
        line,
        column
      })
      cursor += token.length
      column += token.length
      continue
    }

    if (COMMENT.test(code[cursor])) {
      let token = peek.comment(cursor, code)
      tokens.push({
        type: 'comment',
        value: token,
        line,
        column
      })
      cursor += token.length
      column += token.length
      continue
    }

    if (SPACE.test(code[cursor])) {
      tokens.push({
        type: 'space',
        value: ' ',
        line,
        column
      })
      cursor += 1
      column += 1
      continue
    }

    if (NEWLINE.test(code[cursor])) {
      tokens.push({
        type: 'newline',
        value: '\n',
        line,
        column
      })
      cursor += 1
      line += 1
      column = 1
      continue
    }

    /* order important! this comes before str */
    if (BOOLEAN.test(code[cursor])) {
      let tmp = peek.bool(cursor, code)
      let isBoolean = tmp === 'true' || tmp === 'false'
      if (isBoolean) {
        tokens.push({
          type: 'boolean',
          value: tmp === 'false'? false : true, // questionable
          line,
          column
        })
        cursor += tmp.length
        column += tmp.length
        continue
      }
    }

    /* order important! this needs to come before str */
    if (NUMBER.test(code[cursor])) {
      let token = peek.number(cursor, code)
      tokens.push({
        type: 'number',
        value: Number(token),
        line,
        column
      })
      cursor += token.length
      column += token.length
      continue
    }

    if (STRING.test(code[cursor])) {
      let token = peek.string(cursor, code)
      tokens.push({
        type: 'string',
        value: token,
        line,
        column
      })
      cursor += token.length
      column += token.length
      continue
    }

    throw SyntaxError('Unknown character: ' + code[cursor])
  }
  return tokens
}
