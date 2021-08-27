let lexer = require('./lexer')
let parser = require('./parser')
let ast = require('./ast')
let json = require('./compat/json')
let yaml = require('./compat/yaml')
let toml = require('./compat/toml')
let stringify = require('./compat/stringify')

/**
 * @param {string} code
 * @returns {object} parsed arc object
 */
function parse (code) {
  return parser(lexer(code))
}

parse.lexer = lexer
parse.parser = parser
parse.ast = ast
parse.json = json
parse.yaml = yaml
parse.toml = toml
parse.stringify = stringify

module.exports = parse
