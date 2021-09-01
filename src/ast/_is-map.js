let getLines = require('./_get-lines')
let isScalar = t => t.type === 'string' || t.type === 'number' || t.type === 'boolean'

/**
 * @param {array} tokens
 * @returns {boolean}
 */
module.exports = function isMap (tokens) {

  let empty = v => v.filter(t => t.type != 'comment' && t.type != 'newline' && t.type != 'space') != 0
  let lines = getLines(tokens).filter(empty) // remove empty lines

  // name is a single string value
  let name = lines[0].filter(isScalar)
  if (name.length != 1 || name[0].type != 'string') {
    return false
  }

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
  // console.log(tokens)
  let isTwoSpaces = tokens[0].type === 'space' && tokens[1].type === 'space'
  let isValidKey = tokens[2] && tokens[2].type === 'string'
  let isValidValue = tokens.slice(2, tokens.length).filter(isScalar).length >= 0
  let isSingleValue = tokens.slice(2, tokens.length).filter(isScalar).length === 1
  let isFourSpaces = isTwoSpaces && tokens[2].type === 'space' && tokens[3].type === 'space'
  if (isTwoSpaces && isValidKey && isValidValue) {
    // console.log({ isTwoSpaces, isValidKey, isValidValue })
    return true
  }
  if (isFourSpaces && isSingleValue) {
    // console.log({ isFourSpaces, isSingleValue })
    return true
  }
  // console.log('returning false')
  return false
}
