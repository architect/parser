let notempty = require('./_not-empty')

module.exports = function array(lines) {
  let copy = lines.slice(0)
  let end = copy[0].length + 1
  let value = copy[0].filter(notempty).map(t=> t.value)

  let nextline = copy.length > 1 && lines[1][0].type == 'space'
  if (nextline)
    throw SyntaxError('illegal leading space on line ' + lines[1][0].line)

  return {end, value}
}
