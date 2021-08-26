const notempty = require('./_not-empty')
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
  let value = copy[0].filter(notempty).map(t => t.value)

  let nextline = copy.length > 1 && lines[1][0].type == 'space'
  if (nextline)
    throw new SpaceError(lines[1][0])

  return { end, value }
}
