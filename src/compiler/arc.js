const isScalar = require('../parser/_is-scalar')
const { isEmpty } = require('../parser/_check-empty')
const isComplex = t => t.type === 'array' || t.type === 'vector' || t.type === 'map'

/**
 * Compile AST into a Architect plaintext string
 *
 * @param {object} ast
 * @returns {object} arc plaintext string
 */
module.exports = function arc (ast) {
  let arc = ''
  for (let t of ast.values) {
    if (t.type === 'pragma') {
      arc += `@${t.raw}`
      for (let token of t.values) {
        if (isEmpty(token) || isScalar(token)) {
          arc += token.raw ? token.raw : token.value
        }
        if (isComplex(token)) {
          if (token.raw) {
            arc += token.raw + '\n'
          }
          for (let node of token.values) {
            if (node.value) {
              arc += node.quote ? node.raw : node.value
            }
            if (node.values) {
              arc += node.raw
              for (let key of node.values) {
                arc += key.quote ? key.raw : key.value
              }
            }
          }
        }
      }
    }
    if (isEmpty(t)) {
      arc += t.value
    }
  }
  return arc
}
