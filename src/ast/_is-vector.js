let getLines = require('./_get-lines')

/**
 * @param {array} tokens
 * @returns {boolean}
 */
module.exports = function isVector (tokens) {

  let empty = v => v.filter(t => t.type != 'comment' && t.type != 'newline' && t.type != 'space') != 0
  let lines = getLines(tokens).filter(empty) // remove empty lines

  // first line is a scalar value
  let name = lines[0].filter(t => t.type === 'string' || t.type === 'number' || t.type === 'boolean')
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

/** two spaces followed by a scalar value */
function isValidValue (tokens) {
  if (tokens.length < 3) return false
  let isTwoSpaces = tokens[0].type === 'space' && tokens[1].type === 'space'
  let isScalar = tokens[2].type === 'string' || tokens[2].type === 'number' || tokens[2].type === 'boolean'
  return isTwoSpaces && isScalar
}
