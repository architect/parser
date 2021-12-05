let getLines = require('./_get-lines')
let { isTwoSpaces } = require('./_check-spaces')

module.exports = function isIndented (working) {
  let second = getLines(working)[1]
  return Array.isArray(second) && second.length >= 3 && isTwoSpaces(second)
}
