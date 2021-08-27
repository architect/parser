let getLines = require('./_get-lines')
let notempty = require('./_not-empty')

module.exports = function isScalar (working) {

  /*
  // get the indices of all newlines
  let newlines = working.map((t, i) => t.type === 'newline' ? i : false).filter(Boolean)

  // get collection of lines: [[{token}, {token}], [{token, token}]]
  let lines = newlines.reduce(function linebreak (collection, newline, index) {
    let start = index === 0 ? index : newlines[index - 1] + 1
    collection.push(working.slice(start, newline))
    return collection
  }, [])
  */
  let lines = getLines(working)
  // is the first line a scalar value
  return lines[0].filter(notempty).length === 1
}
