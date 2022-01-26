const js = require('./js')
const arc = require('./arc')
const yaml = require('./yaml')

const InvalidArcfile = require('../errors/compile-invalid-arcfile')
const FormatUnknown = require('../errors/compile-format-unknown')

module.exports = function compiler (ast, format = 'js') {

  if (ast.type !== 'arcfile') {
    throw new InvalidArcfile
  }

  if (format === 'js') {
    return js(ast)
  }

  if (format === 'json') {
    return JSON.stringify(js(ast))
  }

  if (format === 'arc') {
    return arc(ast)
  }

  if (format === 'yaml') {
    return yaml(ast)
  }

  throw new FormatUnknown(format)
}
