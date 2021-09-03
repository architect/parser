let lexer = require('./lexer')
let ast = require('./ast')
let compiler = require('./compiler')
let json = require('./compat/json')
let yaml = require('./compat/yaml')
let toml = require('./compat/toml')
let stringify = require('./compat/stringify')

/**
 * @param {string} code
 * @param {string} format: js, json, arc, yaml, or toml
 * @returns {object} parsed arc object
 */
function parse (code, format = 'js') {
  return compiler(ast(lexer(code)), format)
}

parse.lexer = lexer
parse.parser = tokens => compiler(ast(tokens))
parse.compiler = compiler
parse.ast = ast
parse.json = json
parse.yaml = yaml
parse.toml = toml
parse.stringify = stringify

module.exports = parse
