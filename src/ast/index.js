const type = require('./get-type')
// TODO const NotFound = require('../errors/parse-pragma-not-found')
// TODO const AlreadyDefined  = require('../errors/parse-pragma-already-defined')
const InvalidTokens = require('../errors/parse-invalid-tokens')

/**
 * parses tokens into JSON friendly structure if possible
 *
 * @param {array} raw tokens
 * @returns {object}
 */
module.exports = function parse (tokens) {

  // ensure we received valid lexer tokens
  let validTokens = (tokens) => Array.isArray(tokens) && tokens.every(t => typeof t.type != 'undefined')
  if (validTokens(tokens) === false) {
    throw new InvalidTokens(tokens)
  }

  let arcfile = { type: 'arcfile', values: [] }
  let index = 0
  let pragma = false

  while (index < tokens.length) {

    let token = tokens[index]

    // setup the current pragma
    if (token.type === 'pragma') {
      pragma = {
        type: 'pragma',
        name: token.value.replace(/\#.*/gm, '').trim(),
        raw: token.value,
        line: token.line,
        column: token.column,
        values: []
      }
      arcfile.values.push(pragma)
      index += 1
    }

    // stream empty types into the arcfile or current pragma
    let empty = token.type === 'newline' || token.type === 'space' || token.type === 'comment'
    if (empty) {
      (pragma || arcfile).values.push({ ...token })
      index += 1
    }

    // lookahead for complex types (which passes through if just scalar)
    let scalar = token.type === 'number' || token.type === 'boolean' || token.type === 'string'
    if (scalar) {
      let { end, value } = type({ tokens, index })
      pragma.values.push(value)
      index += end
    }
  }

  return arcfile
}
