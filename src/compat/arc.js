let path = require('path')
let fs = require('fs')
let lex = require('../lexer')
let parse = require('../parser')

module.exports = function arc(code) {
  let schemaPath = path.join(__dirname, '..', 'schema.arc')
  let schema = fs.readFileSync(schemaPath).toString()
  return parse(lex(code + schema))
}
