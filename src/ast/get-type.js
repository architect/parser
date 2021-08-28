// const compact = require('./_compact')
// const notempty = require('./_not-empty')
const isScalar = require('./_is-scalar')
const isVector = require('./_is-vector')
const isIndent = require('./_is-indent')
const array = require('./array')
const vector = require('./vector')
// const map = require('./map')

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

  // do we have a scalar string|number|boolean value?
  let scalar = isScalar(working)

  // do we have a possible array or vector value?
  let indent = isIndent(working)
  let validVector = isVector(working)

  // do we have a possible map value?
  // let map = isMap(working)

  let is = {
    scalar: scalar && indent === false, // string, number or boolean
    array: scalar === false, // array of scalar values
    vector: validVector, // vector of scalar values
    // map: scalar && indent === true && singular === false // map of keys and values (scalar or vector)
  }

  if (is.scalar)
    return { end: 1, value: { ...tokens[index] } }

  if (is.array)
    return array(working)

  if (is.vector)
    return vector(working, index)

  // if (is.map)
  //  return map(lines)

  throw new TypeUnknown(tokens[index])
}
