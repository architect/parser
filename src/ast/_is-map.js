let getLines = require('./_get-lines')
let isScalar = t => t.type === 'string' || t.type === 'number' || t.type === 'boolean'

/**
 * @param {array} tokens
 * @returns {boolean}
 */
module.exports = function isMap (tokens) {

  let empty = v => v.filter(t => t.type != 'comment' && t.type != 'newline' && t.type != 'space') != 0
  let lines = getLines(tokens).filter(empty) // remove empty lines

  // first line is a scalar value
  let name = lines[0].filter(isScalar)
  if (name.length != 1)
    return false

  // subsequent lines start w two spaces are also scalar values
  let good = []
  for (let line of lines.slice(1, lines.length)) {
    if (isValidValue(line) === true)
      good.push(line)
    else
      break
  }
  return good.length >= 1
}

/** two spaces followed by a scalar value followed by one or more scalar values */
function isValidValue (tokens) {
  if (tokens.length < 3) return false
  let isTwoSpaces = tokens[0].type === 'space' && tokens[1].type === 'space'
  let isValidKey = tokens[2].type === 'string'
  let isValidValue = tokens.slice(2, tokens.length).filter(isScalar).length > 0
  return isTwoSpaces && isValidKey && isValidValue
}
