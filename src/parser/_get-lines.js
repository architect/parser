/** turn [{}, {}, {}] into [[{}, {}], [{}]] */
module.exports = function getLines (tokens) {

  let lines = []
  let tokenIndex = 0
  let lineIndex = 0

  while (tokenIndex < tokens.length) {

    let token = tokens[tokenIndex]

    if (Array.isArray(lines[lineIndex]) === false) {
      lines[lineIndex] = []
    }

    lines[lineIndex].push({ ...token })

    if (token.type === 'newline') {
      lineIndex += 1
    }

    tokenIndex += 1
  }

  return lines
}
