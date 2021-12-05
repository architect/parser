const isSingle = require('./_is-single-value')
const isVector = require('./_is-vector')
const isIndent = require('./_is-indent')
const isMap = require('./_is-map')
const array = require('./array')
const vector = require('./vector')
const map = require('./map')

const TypeUnknown = require('../errors/parse-type-unknown')

/**
 * extracts scalar, array, vector and map values
 *
 * @param {object} params
 * @param {array} params.tokens
 * @param {number} params.index
 *
 * @example
 * string-scalar-value
 *
 * array of values
 *
 * named
 *   vector
 *   of
 *   values
 *
 * map
 *   key value
 *   one true
 *   ary 1 2 3
 *
 * map
 *   named
 *     vector
 *     of
 *     values
 */
module.exports = function type ({ tokens, index }) {

  // working copy of the relevant tokens
  let working = tokens.slice(index, tokens.length)

  // figure out what type the next value is
  let scalar = isSingle(working)
  let indent = isIndent(working)

  if (scalar && indent === false) {
    return { end: 1, value: { ...tokens[index] } }
  }
  if (scalar === false) {
    return array(working)
  }
  if (isVector(working)) {
    return vector(working)
  }
  if (isMap(working)) {
    return map(working)
  }

  let err = new TypeUnknown(tokens[index])
  err.tokens = tokens.slice(index, tokens.length)
  throw err
}
