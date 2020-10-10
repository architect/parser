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
module.exports = function map (lines) {

  // extract the `name` and create the `end` index
  let copy = lines.slice(0)
  let end = copy[0].length + 1 // length of the current line plus one for the line
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
    // figure out the indentation of the next line
    let line = copy.shift()
    let { onespace, twospace, threespace, fourspace, fivespace } = spaces(line)

    if (onespace || threespace || fivespace)
      throw new SpaceError(line[0])

    if (fourspace && done === false) {

      // four spaces signals a vector value
      if (line.filter(notempty).length > 1)
        throw new KeyError(line[0])
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
      value[name][left.value] = right.length === 1 ? right[0].value : right.map(t => t.value)
    }
    else {

      // indentation is over: we out
      done = true
    }
  }
  return { end, value }
}

/** hide this here */
function spaces (line) {
  if (!Array.isArray(line))
    return { onespace: false, twospace: false, threespace: false, fourspace: false, fivespace: false }
  let onespace = line.length > 2 && line[0].type == 'space' && line[1].type != 'space'
  let twospace = line.length > 2 && line[0].type == 'space' && line[1].type == 'space'
  let threespace = line.length >= 4 && line[0].type == 'space' && line[1].type == 'space' && line[2].type == 'space' && line[3].type != 'space'
  let fourspace = line.length >= 5 && line[0].type == 'space' && line[1].type == 'space' && line[2].type == 'space' && line[3].type == 'space'
  let fivespace = line.length >= 5 && line[0].type == 'space' && line[1].type == 'space' && line[2].type == 'space' && line[3].type == 'space' && line[4].type == 'space'
  return { onespace, twospace, threespace, fourspace, fivespace }
}
