let getLines = require('./_get-lines')

module.exports = function isIndented (working) {
  let second = getLines(working)[1]
  return Array.isArray(second) && second.length >= 3 && second[0].type === 'space' && second[1].type === 'space'
}
