let lex = require('./lexer')
let parser = require('./parser')

/**
 * @param {string} code
 * @returns {string} parsed object
 */
module.exports = function parse(code) {
  return parser(lex(code))
}
