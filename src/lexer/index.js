let {
  SPACE,
  TAB,
  WINDOWS_NEWLINE,
  NEWLINE,
  PRAGMA,
  COMMENT,
  STRING,
  NUMBER,
  BOOLEAN,
} = require('./regexp')

let peek = require('./peek')

let UnknownError = require('../errors/lex-unknown')

/**
 * tokenizes code including spaces and newlines (which are significant) and comments (which are not)
 *
 * @param {string} code
 * @returns {array} tokens [{type, value, line, column}]
 */
module.exports = function lex (code) {

  // state bag for our tokens
  let tokens = []

  // ensure code is terminated by a newline (stripped out later)
  code += '\n'

  // counters
  let cursor = 0
  let line = 1
  let column = 1

  // stream the code one character at a time
  while (cursor < code.length) {

    if (PRAGMA.test(code[cursor])) {
      let token = peek.pragma(cursor, code, line, column)
      tokens.push({
        type: 'pragma',
        value: token.substring(1),
        line,
        column,
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
        column,
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
        column,
      })
      cursor += 1
      column += 1
      continue
    }

    // convert tabs to spaces
    if (TAB.test(code[cursor])) {
      tokens.push({
        type: 'space',
        value: ' ',
        line,
        column,
      })
      tokens.push({
        type: 'space',
        value: ' ',
        line,
        column,
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
        column,
      })
      // special lookahead to see if we got \r\n
      let twochars = code[cursor] + code[cursor + 1]
      cursor += WINDOWS_NEWLINE.test(twochars) ? 2 : 1
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
          value: tmp === 'false' ? false : true, // questionable
          line,
          column,
        })
        cursor += tmp.length
        column += tmp.length
        continue
      }
    }

    /* order important! this needs to come before str */
    if (NUMBER.test(code[cursor])) {
      let token = peek.number(cursor, code)
      if (!Number.isNaN(Number(token))) {
        tokens.push({
          type: 'number',
          value: Number(token),
          line,
          column,
        })
        cursor += token.length
        column += token.length
        continue
      }
    }

    if (STRING.test(code[cursor])) {
      let token = peek.string(cursor, code, line, column)
      let quoteValue = code[cursor]
      let singleQuote = quoteValue === "'"
      let doubleQuote =  quoteValue === '"'
      let backtick = quoteValue === '`'
      let value = {
        type: 'string',
        value: token,
        line,
        column,
      }
      let quote = singleQuote || doubleQuote || backtick
      if (quote) {
        value.raw = `${quoteValue}${token}${quoteValue}`
        value.quote = quoteValue
      }
      tokens.push(value)
      cursor += token.length + (quote ? 2 : 0)
      column += token.length + (quote ? 2 : 0)
      continue
    }

    throw new UnknownError({ character: code[cursor], line, column })
  }

  return tokens.slice(0, tokens.length - 1) // remove trailing token we added at beginning
}
