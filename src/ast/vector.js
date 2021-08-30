const notEmpty = require('./_not-empty')
const getLines = require('./_get-lines')
// TODO const NameError = require('../errors/parse-vector-name-not-string')

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
  let raw = first.reduce((a, v) => {
    if (v.type != 'newline')
      a += v.value
    return a
  }, '')

  // create an array of tokens up to the end of the vector
  let values = []
  for (let line of lines.slice(1, lines.length)) {
    let isEmpty = line.filter(notEmpty).length === 0
    let isTwoSpaces = line[0].type === 'space' && line[1].type === 'space'
    if (isEmpty || isTwoSpaces) {
      for (let token of line) {
        values.push(token)
      }
    }
  }

  return {
    end: first.length + values.length,
    value: { type: 'vector', name, raw, values }
  }
}
