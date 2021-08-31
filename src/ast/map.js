const notEmpty = require('./_not-empty')
const getLines = require('./_get-lines')
const isScalar = v => v.type === 'string' || v.type === 'number' || v.type === 'boolean'
// const SpaceError = require('../errors/parse-map-illegal-space')
// const NameError = require('../errors/parse-map-name-not-string')
// const KeyError = require('../errors/parse-map-key-not-string')

/**
 * extracts a map value
 *
 * @param {string[]} tokens
 * @returns {object} {end, value}
 */
module.exports = function map (tokens) {

  let lines = getLines(tokens.slice(0))

  // grab the map metadata
  let first = lines.slice(0, 1)[0]
  let name = first.filter(t => t.type === 'string')[0].value
  let raw = first.reduce(toString, '')

  // create an array of tokens up to the end of the vector
  let values = []
  let count = first.length
  let isMultiline = false

  for (let line of lines.slice(1, lines.length)) {

    let isEmpty = line.filter(notEmpty).length === 0
    if (isEmpty) {
      for (let token of line) {
        count += 1
        values.push(token)
      }
    }

    let isKey = line[0].type === 'space' && line[1].type === 'space' && line[2].type === 'string'
    if (isKey) {
      let name = line[2].value
      let raw = line.slice(0).reduce(toString, '')
      let key = { type: 'key', name, raw, values: [] }
      count += 3 // two spaces and a string
      isMultiline = line.slice(0).filter(isScalar).length === 1
      if (isMultiline) {
        isMultiline = key
      }
      else {
        key.values = line.slice(3, line.length)
        count += key.values.length
      }
      values.push(key)
    }

    if (isMultiline && isEmpty === false) {
      let isFourSpacesAndScalar =
        line[0].type === 'space' &&
        line[1].type === 'space' &&
        line[2].type === 'space' &&
        line[3].type === 'space' &&
        isScalar(line[4])
      if (isFourSpacesAndScalar) {
        for (let token of line) {
          count += 1
          isMultiline.values.push(token)
        }
      }
      else {
        isMultiline = false
      }
    }
  }

  return {
    end: count,
    value: { type: 'map', name, raw, values }
  }
}

/** reduce array of tokens toString */
function toString (str, value) {
  if (value.type != 'newline')
    str += value.value
  return str
}
