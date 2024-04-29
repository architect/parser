const { isNotEmpty } = require('./_check-empty')
const { isTwoSpaces, isFourSpaces } = require('./_check-spaces')
const getLines = require('./_get-lines')
const isScalar = require('./_is-scalar')
const toString = require('./_to-string')

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
  let currentKey
  let next = lines.slice(1, lines.length)

  for (let line of next) {

    let isEmpty = line.filter(isNotEmpty).length === 0

    // capture the map keys as vector types
    let isKey = isTwoSpaces(line) &&
                line[2]?.type === 'string'
    if (isKey) {
      let name = line[2].value
      let raw = line.slice(0).reduce(toString, '').split(name)[0] + name
      let key = { type: 'vector', name, raw, values: [] }
      isMultiline = line.slice(0).filter(isScalar).length === 1
      if (isMultiline) {
        currentKey = key
        currentKey.raw += '\n' // capture implicit newline in raw
      }
      else {
        key.values = line.slice(3, line.length)
      }
      count += 3 // space|space|string
      values.push(key)
      continue
    }

    // if we got here we just adding up the emptiness
    if (isMultiline === true && isEmpty === true) {
      for (let token of line) {
        currentKey.values.push(token)
      }
      continue
    }

    if (isMultiline === true && isEmpty === false) {
      if (isFourSpaces(line) && isScalar(line[4])) {
        count += 5 // space|space|space|space|string
        for (let token of line) {
          currentKey.values.push(token)
        }
      }
      else {
        isMultiline = false
      }
      continue
    }
    // end for
    break
  }

  // calc the token offset
  let end = count + values.reduce(function flat (a, token) {
    if (token.type === 'vector') {
      for (let t of token.values) {
        a.push(t)
      }
    }
    else {
      a.push(token)
    }
    return a
  }, []).length

  return {
    end,
    value: { type: 'map', name, raw, values },
  }
}
