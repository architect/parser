let removeComments = require('./_remove-comments')
let getSections = require('./_get-sections')
let parseSection = require('./_parse-section')

module.exports = function parse(text) {
  if (!text) throw Error('missing text')
  var clean = removeComments(text)
  var parts = getSections(clean).map(parseSection)
  return parts.reduce((a,b)=> Object.assign({}, a, b))
}
