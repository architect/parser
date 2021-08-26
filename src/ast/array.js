const SpaceError = require('../errors/parse-array-illegal-space')

/**
 * extract an array value from a list of tokens
 *
 * @param {lines} an array of tokens
 * @returns {object} {end, value}
 */
module.exports = function array (lines) {

  let copy = lines.slice(0)
  let end = copy[0].length + 1
  let value = { type: 'array', line: copy[0][0].line, column: copy[0][0].column, values: copy[0] }

  let nextline = copy.length > 1 && lines[1][0].type == 'space'
  if (nextline)
    throw new SpaceError(lines[1][0])

  return { end, value }
}
