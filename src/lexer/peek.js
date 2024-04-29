const {
  DASHERIZED,
  SPACE,
  NEWLINE,
  STRING,
} = require('./regexp')

const PragmaSyntaxError = require('../errors/lex-pragma-syntax')
const CloseQuoteNotFoundError = require('../errors/lex-close-quote-not-found')

/**
 * helper for slicing out a lexeme token: pragma, comment, boolean, number or a string
 *
 * @param {number} cursor
 * @param {code} source code string
 * @returns {string} token
 */
module.exports = {

  pragma (cursor, code, line, column) {
    let copy = code.slice(cursor, code.length)
    let matches = copy.match(NEWLINE)
    let end = matches && matches.index ? matches.index : code.length
    let token = copy.slice(0, end).trim()
    let tidy = token.replace(/\#.*/gm, '').substring(1).trim() // remove comments/whitespace/leading @
    if (!DASHERIZED.test(tidy)) {
      throw new PragmaSyntaxError({ token, line, column })
    }
    return token
  },

  comment (cursor, code) {
    let copy = code.slice(cursor, code.length)
    let matches = copy.match(NEWLINE)
    let end = matches && matches.index ? matches.index : code.length
    return copy.slice(0, end)
  },

  bool (cursor, code) {
    let copy = code.slice(cursor, code.length)
    let mSpace = copy.match(SPACE)
    let mNewline = copy.match(NEWLINE)
    let iSpace = mSpace && mSpace.index ? mSpace.index : false
    let iNewline = mNewline && mNewline.index ? mNewline.index : false
    let end = (iSpace || iNewline) ? (iSpace && iSpace < iNewline ? iSpace : iNewline) : code.length
    return copy.slice(0, end).trim()
  },

  number (cursor, code) {
    let copy = code.slice(cursor, code.length)
    let mSpace = copy.match(SPACE)
    let mNewline = copy.match(NEWLINE)
    let iSpace = mSpace && mSpace.index ? mSpace.index : false
    let iNewline = mNewline && mNewline.index ? mNewline.index : false
    let end = (iSpace || iNewline) ? (iSpace && iSpace < iNewline ? iSpace : iNewline) : code.length
    return copy.slice(0, end).trim()
  },

  string (cursor, code, line, column) {
    let pointer = cursor
    let character = code[cursor]
    let token = ''
    if (character === '"' || character === '`' || character === "'") {
      // seek ahead to next instance of " skipping any \" references
      let copy = code.slice(cursor + 1, code.length)
      let count = 0
      let last = (function getNextQuote () {
        // create a copy of the code string
        let inner = copy.substring(count, copy.length)
        let index = inner.indexOf(character)
        // if we didn't find it blow up hard
        let notfound = index === -1
        if (notfound) {
          throw new CloseQuoteNotFoundError({ line, column })
        }
        // if is not an excaped value return
        let escapee = inner[index - 1] === '\\'
        if (!escapee) {
          return index
        }
        // by default continue searching
        count = index
        getNextQuote()
      })()
      return copy.substring(0, last)
    }
    else {
      while (STRING.test(character)) {
        token += character
        character = code[++pointer]
      }
      return token
    }
  },
}
