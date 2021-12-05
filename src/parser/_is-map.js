const getLines = require('./_get-lines')
const isScalar = require('./_is-scalar')
const { isTwoSpaces, isFourSpaces } = require('./_check-spaces')
const { isNotEmpty } = require('./_check-empty')
const MapNameNotString = require('../errors/parse-map-name-not-string')
const MapKeyNotString = require('../errors/parse-map-key-not-string')
const MapKeyUndefinedValue = require('../errors/parse-map-key-undefined-value')

/**
 * @param {array} tokens
 * @returns {boolean}
 */
module.exports = function isMap (tokens) {

  let empty = v => v.filter(isNotEmpty) != 0
  let lines = getLines(tokens).filter(empty) // remove empty lines

  // name is a single string value
  let name = lines[0].filter(isScalar)
  if (name.length !== 1) {
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
  if (isSignalingMap && name[0].type !== 'string') {
    throw new MapNameNotString({ ...name[0] })
  }
  else if (isSignalingMap && name[0].type === 'string') {
    // check that all keys are strings
    for (let value of good) {
      let line = value.filter(isScalar)
      let left = line[0]
      if ((left && left.type && left.type === 'string') || isFourSpaces(value)) {
        continue
      }
      else {
        throw new MapKeyNotString(left || value[0][0] || {})
      }
    }
    // check that all keys have values
    for (let i = 0; i < good.length; i++) {
      let value = good[i]
      let isSingleValue = value.filter(isScalar).length === 1
      if (isSingleValue === true && !isFourSpaces(value)) {
        let isAlsoSingleValue = Array.isArray(good) &&
                                good[i + 1].filter(isScalar).length === 1
        if (isAlsoSingleValue === false) {
          throw new MapKeyUndefinedValue(good[i][0])
        }
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
  let isValidValue = tokens.slice(2, tokens.length).filter(isScalar).length >= 1
  if ((isTwoSpaces(tokens) || isFourSpaces(tokens)) && isValidValue) {
    return true
  }
  return false
}
