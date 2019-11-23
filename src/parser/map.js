const notempty = require('./_not-empty')
const SpaceError = require('../errors/parse-map-illegal-space')
const NameError = require('../errors/parse-map-name-not-string')
const KeyError = require('../errors/parse-map-key-not-string')

/**
 * extracts a map value
 *
 * @param {lines}
 * @param {number} index
 * @returns {object} {end, value}
 */
module.exports = function map(lines, index) {

  // extract the `name` and create the `end` index
  let copy = lines.slice(0)
  let end = index + copy[0].length + 1
  let raw = copy.shift().filter(notempty)[0]
  let name = raw.value

  if (!name || raw.type != 'string')
    throw new NameError(lines[0][0])

  // final state to return for the map token
  let value = {}
  value[name] = {}

  // keep score
  let last = false
  let done = false

  while (!done) {
    let line = copy.shift()

    let onespace = Array.isArray(line) && line.length > 2 && line[0].type == 'space' && line[1].type != 'space'
    let twospace = Array.isArray(line) && line.length > 2 && line[0].type == 'space' && line[1].type == 'space'
    let threespace = Array.isArray(line) && line.length >= 4 && line[0].type == 'space' && line[1].type == 'space' && line[2].type == 'space' && line[3].type != 'space'
    let fourspace = Array.isArray(line) && line.length >= 5 && line[0].type == 'space' && line[1].type == 'space' && line[2].type == 'space' && line[3].type == 'space'
    let fivespace = Array.isArray(line) && line.length >= 5 && line[0].type == 'space' && line[1].type == 'space' && line[2].type == 'space' && line[3].type == 'space' && line[4].type == 'space'

    if (onespace || threespace || fivespace)
      throw new SpaceError(line[0]) //SyntaxError('illegal single space indent line ' + line[0].line)

    if (fourspace && done === false) {
      // four spaces signals a vector value

      if (line.filter(notempty).length > 1)
        throw new KeyError(line[0])//SyntaxError('illegal too many values on line ' + line[0].line)

      // if (last === false || Array.isArray(value[name][last]) === false)
      //  throw SyntaxError('illegal vector key must be string value on line ' + line[0].line)

      end += 1 // one for the line
      end += line.length // for all the tokens in the given line
      let right = line.filter(notempty)[0].value
      value[name][last].push(right)
    }
    else if (twospace && done === false) {
      // two spaces signals a key/value
      end += 1 // one for the line
      end += line.length // for all the tokens in the given line
      let right = line.filter(notempty).slice(0)
      let left = right.shift()
      if (left.type != 'string')
        throw new KeyError(left)
      last = left.value // reuse this for vert vector trapping
      value[name][left.value] = right.length === 1? right[0].value : right.map(t=> t.value)
    }
    else {
      // indentation is over: we out
      done = true
    }
  }
  return {end, value}
}
