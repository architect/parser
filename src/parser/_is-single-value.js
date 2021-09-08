let getLines = require('./_get-lines')
let notempty = require('./_not-empty')

module.exports = function isScalar (working) {
  let first = getLines(working)[0]
  return first && first.filter(notempty).length === 1
}
