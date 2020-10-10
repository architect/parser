const compact = require('./_compact')
const type = require('./get-type')
const NotFound = require('../errors/parse-pragma-not-found')
const AlreadyDefined  = require('../errors/parse-pragma-already-defined')

/**
 * parses tokens into JSON friendly structure if possible
 *
 * @param {array} raw tokens
 * @returns {object}
 */
module.exports = function parse (raw, sourcemap = false) {

  let tokens = compact(raw)
  // console.log({tokens})

  // arcfiles must begin with an @pragma
  if (tokens[0].type != 'pragma')
    throw new NotFound

  let arc = {}
  let src = {}
  let pragma = false
  let index = 0

  while (index < tokens.length) {

    let token = tokens[index]

    if (token.type === 'pragma') {

      // pragmas must be unique
      if ({}.hasOwnProperty.call(arc, token.value))
        throw new AlreadyDefined(token)

      // create the pragma
      arc[token.value] = []

      // create a source map
      src[token.value] = []

      // keep a ref to the current pragma
      pragma = token.value
      index += 1
    }

    // ignore newlines and spaces
    let empty = token.type === 'newline' || token.type === 'space'
    if (empty)
      index += 1

    if (token.type === 'number' || token.type === 'boolean' || token.type === 'string') {
      let { end, value } = type({ tokens, index })
      arc[pragma].push(value)
      src[pragma].push({ start: token, end: tokens[index + end] })
      index += end
    }
  }

  return sourcemap ? { arc, src } : arc
}
