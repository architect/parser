const notempty = require('./_not-empty')
const NameError = require('../errors/parse-vector-name-not-string')

/**
 * extract a vector value
 *
 * @param {array} lines
 * @param {number} index
 * @returns {object} {end, value}
 */
module.exports = function vector (lines) {

  let copy = lines.slice(0)
  let end = copy[0].length + 1 // len of the tokes in the line plus one for the line itself
  let raw = copy.shift().filter(notempty)[0]
  let name = raw.value

  if (!name || raw.type != 'string')
    throw new NameError(lines[0][0])

  let value = {}
  value[name] = []

  let done = false
  while (!done) {
    let line = copy.shift()
    let indented = Array.isArray(line) && line.length > 2 && line[0].type == 'space' && line[1].type == 'space'
    if (indented && done === false) {
      end += 1 // one for the line
      end += line.length // for all the tokens in the given line
      value[name].push(line.filter(notempty)[0].value)
    }
    else {
      done = true
    }
  }

  return { end, value }
}
