let trim = require('./_trim')
let compact = require('./_compact')
let type = require('./get-type')

/**
 * parses tokens into JSON friendly structure if possible
 *
 * @param {array} raw tokens
 * @returns {object}
 */
module.exports = function parse(raw) {

  let tokens = trim(compact(raw))
  //console.log({tokens})

  // arcfiles must begin with an @pragma
  if (tokens[0].type != 'pragma')
    throw SyntaxError('arcfile must define an opening @pragma')

  let arc = {}
  let pragma = false
  let index = 0

  while (index < tokens.length) {

    let token = tokens[index]

    if (token.type === 'pragma') {
      // pragmas must be unique
      if ({}.hasOwnProperty.call(arc, token.value)) {
        throw ReferenceError(`@${token.value} pragma already defined`)
      }
      // create the pragma
      arc[token.value] = []
      // keep a ref to the current pragma
      pragma = token.value
      index += 1
    }

    // ignore newlines and spaces
    let empty = token.type === 'newline' || token.type === 'space'
    if (empty)
      index += 1

    if (token.type === 'number' || token.type === 'boolean' || token.type === 'string') {
      let {end, value} = type({tokens, index})
      arc[pragma].push(value)
      index += end
    }
  }

  if (arc.schema && arc.types) {
    console.log(arc.schema)
  }

  return arc
}
