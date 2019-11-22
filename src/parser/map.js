let notempty = require('./_not-empty')

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
  let name = copy.shift().filter(notempty)[0].value

  if (!name)
    throw SyntaxError(`map name must be string`)

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
      throw SyntaxError('illegal single space indent line ' + line[0].line)

    if (fourspace && done === false) {
      // four spaces signals a vector value

      if (line.filter(notempty).length > 1)
        throw SyntaxError('illegal too many values on line ' + line[0].line)

      if (last === false || Array.isArray(value[name][last]) === false)
        throw SyntaxError('illegal vector key must be string value on line ' + line[0].line)

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
      let left = right.shift().value
      last = left // reuse this for vert vector trapping
      value[name][left] = right.length === 1? right[0].value : right.map(t=> t.value)
    }
    else {
      // indentation is over: we out
      done = true
    }
  }
  return {end, value}
}
