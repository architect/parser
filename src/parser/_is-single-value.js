let getLines = require('./_get-lines')
let { isNotEmpty } = require('./_check-empty')

module.exports = function isScalar (working) {
  let first = getLines(working)[0]
  return first && first.filter(isNotEmpty).length === 1
}
