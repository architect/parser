
/**
 * @param {array} tokens
 * @returns {boolean}
 */
module.exports = function isVector (tokens) {

  let empty = v => v.filter(t => t.type != 'comment' && t.type != 'newline' && t.type != 'space') != 0
  let lines = getLines(tokens).filter(empty) // remove empty lines

  // first line is a scalar value
  let name = lines[0].filter(t => t.type === 'string' || t.type === 'number' || t.type === 'boolean')
  if (name.length != 1)
    return false

  // subsequent lines start w two spaces are also scalar values
  return lines.slice(1, lines.length).map(isValidValue).filter(v => v === false).length === 0
}

/** two spaces followed by a scalar value */
function isValidValue (tokens) {
  let isTwoSpaces = tokens[0].type === 'space' && tokens[1].type === 'space'
  let isScalar = tokens[2].type === 'string' || tokens[2].type === 'number' || tokens[2].type === 'boolean'
  return isTwoSpaces && isScalar
}

/** turn [{}, {}, {}] into [[{}, {}], [{}]] */
function getLines (tokens) {

  let lines = []
  let tokenIndex = 0
  let lineIndex = 0

  while (tokenIndex < tokens.length) {
    let token = tokens[tokenIndex]

    if (Array.isArray(lines[lineIndex]) === false)
      lines[lineIndex] = []

    if (token.type != 'comment')
      lines[lineIndex].push(token)

    if (token.type === 'newline') {
      lineIndex += 1
    }

    tokenIndex += 1
  }
  return lines
}
