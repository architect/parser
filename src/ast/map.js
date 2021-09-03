const notEmpty = require('./_not-empty')
const getLines = require('./_get-lines')
const isScalar = v => v.type === 'string' || v.type === 'number' || v.type === 'boolean'

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

    let isEmpty = line.filter(notEmpty).length === 0
    if (isMultiline === false && isEmpty === true) {
      for (let token of line) {
        values.push(token)
      }
      continue
    }


    let isKey = line[0].type === 'space' && line[1].type === 'space' && line[2].type === 'string'
    if (isKey) {
      let name = line[2].value
      let raw = line.slice(0).reduce(toString, '')
      let key = { type: 'vector', name, raw, values: [] }
      isMultiline = line.slice(0).filter(isScalar).length === 1
      if (isMultiline) {
        currentKey = key
      }
      else {
        key.values = line.slice(3, line.length)
      }
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
      let isFourSpacesAndScalar =
        line[0].type === 'space' &&
        line[1].type === 'space' &&
        line[2].type === 'space' &&
        line[3].type === 'space' &&
        isScalar(line[4])
      if (isFourSpacesAndScalar) {
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
      a.push({}) // space
      a.push({}) // space
      a.push({}) // string
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
    value: { type: 'map', name, raw, values }
  }
}

/** reduce array of tokens toString */
function toString (str, value) {
  if (value.type != 'newline')
    str += value.value
  return str
}
