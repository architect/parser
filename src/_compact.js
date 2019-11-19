let notempty = require('./_not-empty')
/**
 * removes comments and empty lines
 *
 * @param {array} tokens
 * @returns {array} tokens
 */
module.exports = function compact(tokens) {

  // grabs a copy removing all comments
  let copy = tokens.slice(0).filter(t=> t.type != 'comment')

  // get the indices of all newlines
  let newlines = copy.map((t, i)=> t.type === 'newline'? i : false).filter(Boolean)
  let newlinetokens = copy.map(t=> t.type === 'newline'? t : false).filter(Boolean)
  let newlinemap = []

  // get collection of lines: [[{token}, {token}], [{token, token}]]
  let lines = newlines.reduce(function linebreak(collection, newline, index) {
    let start = index === 0? index : newlines[index - 1] + 1
    let line = copy.slice(start, newline)
    let empty = line.filter(notempty).length === 0
    if (!empty) {
      collection.push(line)
      newlinemap.push(newlinetokens[newlines.indexOf(newline)])
    }
    return collection
  }, [])

  // flatten result
  let result = []
  let index = 0
  lines.forEach(line=> {
    line.forEach(token=> {
      result.push(token)
    })
    result.push(newlinemap[index])
    index += 1
  })

  return result
}
