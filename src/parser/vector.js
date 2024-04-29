const getLines = require('./_get-lines')
const { isTwoSpaces } = require('./_check-spaces')
const toString = require('./_to-string')

/**
 * extract a vector value
 *
 * @param {array} lines
 * @param {number} index
 * @returns {object} {end, value}
 */
module.exports = function vector (tokens) {

  let copy = tokens.slice(0)
  let lines = getLines(copy)

  // grab the vector metadata
  let first = lines.slice(0, 1)[0]
  let name = first.filter( t => t.type === 'string')[0].value
  let raw = first.reduce(toString, '')
  let rest = lines.slice(1, lines.length)

  // create an array of tokens up to the end of the vector
  let values = []
  for (let line of rest) {
    if (isTwoSpaces(line)) {
      for (let token of line) {
        values.push(token)
      }
    }
    else {
      break
    }
  }

  return {
    end: first.length + values.length,
    value: { type: 'vector', name, raw, values },
  }
}
