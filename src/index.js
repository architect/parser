let lexer = require('./lexer')
let parser = require('./parser')
let json = require('./compat/json')
let yaml = require('./compat/yaml')
let toml = require('./compat/toml')
let stringify = require('./compat/stringify')
let read = require('./read')

/**
 * @param {string} code
 * @returns {object} parsed arc object
 */
function parse(code) {
  return parser(lexer(code))
}

parse.lexer = lexer
parse.parser = parser
parse.json = json
parse.yaml = yaml
parse.toml = toml
parse.stringify = stringify
parse.readArc = read
parse.read = read // Deprecated

module.exports = parse
