let notempty = require('./_not-empty')

module.exports = function vector(lines, index) {

  let copy = lines.slice(0)
  let end = index + copy[0].length + 1
  let name = copy.shift().filter(notempty)[0].value

  let value = {}
  value[name] = []

  let done = false
  while (!done) {
    let line = copy.shift()
    let indented = Array.isArray(line) && line.length > 2 && line[0].type == 'space' && line[1].type == 'space'
    if (indented && done === false) {
      end += 1 // one for the line
      end += line.length // for all the tokens in the given line
      value[name].push(line.filter(notempty)[0].value)
    }
    else {
      done = true
    }
  }

  return {end, value}
}
