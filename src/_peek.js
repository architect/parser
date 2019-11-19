const {DASHERIZED, SPACE, NEWLINE, STRING} = require('./_regexp')

/**
 * helper for slicing out a lexeme token: pragma, comment, boolean, number or a string
 *
 * @param {number} cursor
 * @param {code} source code string
 * @returns {string} token
 */
module.exports = {

  pragma(cursor, code) {
    let copy = code.slice(cursor, code.length)
    let matches = copy.match(NEWLINE)
    let end = matches && matches.index? matches.index : code.length
    let token = copy.slice(0, end).trim()
    console.log('HEY TOKEN', token)
    if (!DASHERIZED.test(token.substring(1))) //ignore the leading @
      throw SyntaxError(`pragma "${token}" contains illegal characters`)
    return token
  },

  comment(cursor, code) {
    let copy = code.slice(cursor, code.length)
    let matches = copy.match(NEWLINE)
    let end = matches && matches.index? matches.index : code.length
    return copy.slice(0, end)
  },

  bool(cursor, code) {
    let copy = code.slice(cursor, code.length)
    let mSpace = copy.match(SPACE)
    let mNewline = copy.match(NEWLINE)
    let iSpace = mSpace && mSpace.index? mSpace.index : false
    let iNewline = mNewline && mNewline.index? mNewline.index : false
    let end = (iSpace || iNewline)? (iSpace && iSpace < iNewline? iSpace : iNewline) : code.length
    return copy.slice(0, end).trim()
  },

  number(cursor, code) {
    let copy = code.slice(cursor, code.length)
    let mSpace = copy.match(SPACE)
    let mNewline = copy.match(NEWLINE)
    let iSpace = mSpace && mSpace.index? mSpace.index : false
    let iNewline = mNewline && mNewline.index? mNewline.index : false
    let end = (iSpace || iNewline)? (iSpace && iSpace < iNewline? iSpace : iNewline) : code.length
    return copy.slice(0, end).trim()
  },

  string(cursor, code) {
    let pointer = cursor
    let character = code[cursor]
    let token = ''
    while (STRING.test(character)) {
      token += character
      character = code[++pointer]
      // TODO check for invalid characters
    }
    return token
  }
}
