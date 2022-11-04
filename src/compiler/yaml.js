const isScalar = require('../parser/_is-scalar')
const { isEmpty } = require('../parser/_check-empty')

/**
 * Compile AST into a Architect plaintext string
 *
 * @param {object} ast
 * @returns {object} arc plaintext string
 */
module.exports = function yaml (ast) {
  let arc = ''
  for (let t of ast.values) {
    if (t.type === 'pragma') {
      arc += t.raw.replace(t.name, t.name + ':')
      for (let token of t.values) {
        if (isEmpty(token)) {
          arc += token.value
        }
        if (isScalar(token)) {
          arc += '- ' + token.value
        }
        if (token.type === 'array') {
          arc += '- [ ' + token.values.filter(isScalar).map(t => t.quote ? t.raw : t.value).join(', ') + ' ]\n'
        }
        if (token.type === 'vector') {
          arc += '- ' + token.raw
          for (let node of token.values) {
            if (isScalar(node.type)) {
              arc += '  - ' + node.value
            }
            if (isEmpty(node.type)) {
              arc += node.value
            }
          }
        }
        if (token.type === 'map') {
          arc += '- ' + token.raw
          for (let node of token.values) {
            if (node.type === 'vector') {
              arc += node.raw
              for (let key of node.values) {
                // vector values are either scalar or empty
                if (isScalar(key)) {
                  throw Error
                }
                if (isEmpty(key)) {
                  arc += node.value
                }
              }
            }
            if (isEmpty(node.type)) {
              arc += node.value
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
