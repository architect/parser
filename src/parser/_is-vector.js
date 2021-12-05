const isScalar = require('./_is-scalar')
const getLines = require('./_get-lines')
const { isTwoSpaces, isFourSpaces } = require('./_check-spaces')
const { isNotEmpty } = require('./_check-empty')
const VectorNameNotString = require('../errors/parse-vector-name-not-string')

/**
 * @param {array} tokens
 * @returns {boolean}
 */
module.exports = function isVector (tokens) {

  let empty = v => v.filter(isNotEmpty) != 0
  let lines = getLines(tokens).filter(empty) // remove empty lines

  // first line is a scalar value
  let name = lines[0].filter(isScalar)
  if (name.length !== 1) {
    return false
  }

  // subsequent lines start w two spaces are also scalar values
  let rest = lines.slice(1, lines.length)
  let line = rest[0]
  let next = rest[1]
  let values = Array.isArray(line) ? line.filter(isScalar) : []

  let isOneValue = values.length === 1
  let isTwoValues = values.length >= 2

  // this signals map not vector
  if (isTwoSpaces && isTwoValues) {
    return false
  }

  // signals vec but could be a map with a vec
  if (isTwoSpaces && isOneValue) {

    // check next line isn't four spaces and one value
    let isOneAlso = Array.isArray(next) && next.filter(isScalar).length === 1
    if (isFourSpaces(next) && isOneAlso) {
      return false
    }

    // valid so far ... but lastly check name (important this is here)
    if (name[0].type !== 'string') {
      throw new VectorNameNotString({ ...name[0] })
    }

    return true
  }

  // when in doubt
  return false
}
