const type = require('./get-type')
const isScalar = require('./_is-scalar')
const { isEmpty } = require('./_check-empty')
const InvalidTokens = require('../errors/parse-invalid-tokens')
const NotFound = require('../errors/parse-pragma-not-found')
const AlreadyDefined  = require('../errors/parse-pragma-already-defined')

/**
 * parses tokens into JSON friendly structure if possible
 *
 * @param {array} raw tokens
 * @returns {object}
 */
module.exports = function parse (tokens) {

  // ensure we received valid lexer tokens
  let validTokens = Array.isArray(tokens) && tokens.every(t => typeof t.type !== 'undefined')
  if (validTokens === false) {
    throw new InvalidTokens(tokens)
  }

  // arcfile must have one pragma
  let pragmas = tokens.filter(t => t.type === 'pragma')
  let hasPragma = pragmas.length > 0
  if (hasPragma === false) {
    throw new NotFound(tokens)
  }

  // pragmas must be unique
  let tmp = {}
  for (let pragma of pragmas) {
    if (tmp[pragma.value]) {
      throw new AlreadyDefined(pragma)
    }
    else {
      tmp[pragma.value] = true
    }
  }

  // construct the ast
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
        values: [],
      }
      arcfile.values.push(pragma)
      index += 1
    }

    // stream empty types into the arcfile or current pragma
    let empty = isEmpty(token)
    if (empty) {
      let current = pragma || arcfile
      current.values.push({ ...token })
      index += 1
    }

    // lookahead for complex types (which passes through if just scalar)
    let scalar = isScalar(token)
    if (scalar) {
      let { end, value } = type({ tokens, index })
      pragma.values.push(value)
      index += end
    }
  }

  return arcfile
}
