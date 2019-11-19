let arc = require('./compat/arc')
let json = require('./compat/json')
let yaml = require('./compat/yaml')
let stringify = require('./compat/stringify')
let lex = require('./lexer')
let parser = require('./parser')

/**
 * @param {string} code
 * @returns {string} parsed arc object
 */
function parse(code) {
  return parser(lex(code))
}

parse.arc = arc
parse.json = json
parse.yaml = yaml
parse.stringify = stringify

module.exports = parse
