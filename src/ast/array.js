const getLines = require('./_get-lines')
// const SpaceError = require('../errors/parse-array-illegal-space')

/**
 * extract an array value from a list of tokens
 *
 * @param {lines} an array of tokens
 * @returns {object} {end, value}
 */
module.exports = function array (lines) {

  let copy = getLines(lines)
  let end = copy[0].length
  let value = {
    type: 'array',
    line: copy[0][0].line,
    column: copy[0][0].column,
    values: copy[0].slice(0)
  }

  /*
  let nextline = copy.length > 1 && copy[1][0].type == 'space'
  if (nextline)
    throw new SpaceError(copy[1][0])
  */
  return { end, value }
}
