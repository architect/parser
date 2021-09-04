const getLines = require('./_get-lines')
const isScalar = require('./_is-scalar')
const MapNameNotString = require('../errors/parse-map-name-not-string')
const MapKeyNotString = require('../errors/parse-map-key-not-string')

/**
 * @param {array} tokens
 * @returns {boolean}
 */
module.exports = function isMap (tokens) {

  let empty = v => v.filter(t => t.type != 'comment' && t.type != 'newline' && t.type != 'space') != 0
  let lines = getLines(tokens).filter(empty) // remove empty lines

  // name is a single string value
  let name = lines[0].filter(isScalar)
  if (name.length != 1) {
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

  // if they have a k/v line
  let isSignalingMap = good.length >= 1
  if (isSignalingMap && name[0].type != 'string') {
    throw new MapNameNotString({ ...name[0] })
  }
  else if (isSignalingMap && name[0].type === 'string') {
    // check that all keys are strings
    for (let v of good) {
      let four = v[0].type === 'space' &&
        v[1].type === 'space' &&
        v[2].type === 'space' &&
        v[3].type === 'space'
      let line = v.filter(isScalar)
      let left = line[0]
      if ((left && left.type && left.type === 'string') || four) {
        continue
      }
      else {
        // console.log({ left })
        throw new MapKeyNotString(left || v[0][0] || {})
      }
    }
    return true
  }
  else {
    return false
  }
}

/** two spaces followed by a scalar value followed by one or more scalar values */
function isValidValue (tokens) {
  let isTwoSpaces = tokens[0].type === 'space' && tokens[1].type === 'space'
  // let isValidKey = tokens[2] && tokens[2].type === 'string'
  let isValidValue = tokens.slice(2, tokens.length).filter(isScalar).length >= 0
  let isSingleValue = tokens.slice(2, tokens.length).filter(isScalar).length === 1
  let isFourSpaces = isTwoSpaces && tokens[2].type === 'space' && tokens[3].type === 'space'
  if (isTwoSpaces && isValidValue) {
    return true
  }
  if (isFourSpaces && isSingleValue) {
    // TODO peek here to ensure next line is single value
    return true
  }
  return false
}
