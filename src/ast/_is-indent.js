let getLines = require('./_get-lines')

module.exports = function isIndented (working) {
  /*
  // get the indices of all newlines
  let newlines = working.map((t, i) => t.type === 'newline' ? i : false).filter(Boolean)

  // get collection of lines: [[{token}, {token}], [{token, token}]]
  let lines = newlines.reduce(function linebreak (collection, newline, index) {
    let start = index === 0 ? index : newlines[index - 1] + 1
    collection.push(working.slice(start, newline))
    return collection
  }, [])

  // extract the second line
  let second = lines[1]
  */
  let second = getLines(working)[1]

  // is the second line indented two spaces? (signaling a named vector or map value)
  return Array.isArray(second) && second.length >= 3 && second[0].type === 'space' && second[1].type === 'space'
}
