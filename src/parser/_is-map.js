const getLines = require('./_get-lines')
const isScalar = require('./_is-scalar')
const MapNameNotString = require('../errors/parse-map-name-not-string')
const MapKeyNotString = require('../errors/parse-map-key-not-string')
const MapKeyUndefinedValue = require('../errors/parse-map-key-undefined-value')

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
  let rest = lines.slice(1, lines.length)
  for (let line of rest) {
    if (isValidValue(line) === true) {
      good.push(line)
    }
    else {
      break
    }
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
    // check that all keys have values
    for (let i = 0; i < good.length; i++) {
      let value = good[i]
      let isSingleValue = value.filter(isScalar).length === 1
      let isValue = value[0].type === 'space' && value[1].type === 'space' && value[2].type === 'space' && value[3].type === 'space'
      if (isSingleValue === true && isValue === false) {
        let isAlsoSingleValue = Array.isArray(good) && good[i + 1].filter(isScalar).length === 1
        if (isAlsoSingleValue === false)
          throw new MapKeyUndefinedValue(good[i][0])
      }
    }

    return true
  }
  else {
    return false
  }
}

/** two or four spaces followed by a scalar value followed by zero or more scalar values */
function isValidValue (tokens) {
  let isTwoSpaces = tokens[0].type === 'space' && tokens[1].type === 'space'
  let isValidValue = tokens.slice(2, tokens.length).filter(isScalar).length >= 1
  let isFourSpaces = isTwoSpaces && tokens[2].type === 'space' && tokens[3].type === 'space'
  if ((isTwoSpaces || isFourSpaces) && isValidValue)
    return true
  return false
}
