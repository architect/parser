const isScalar = require('../parser/_is-scalar')

/**
 * Compile AST into a plain Architect JavaScript Object
 *
 * @param {object} ast
 * @returns {object} arc plain javascript object
 */
module.exports = function js (ast) {

  let arc = {}

  for (let pragma of ast.values.filter(t => t.type === 'pragma')) {

    // add the pragma
    arc[pragma.name] = []

    // add the values for said pragma
    for (let token of pragma.values) {

      // scalars
      if (isScalar(token)) {
        arc[pragma.name].push(token.value)
      }

      // array
      if (token.type === 'array') {
        arc[pragma.name].push(token.values.filter(isScalar).map(t => t.value))
      }

      // vector
      if (token.type === 'vector') {
        let vector = {}
        vector[token.name] = token.values.filter(isScalar).map(t => t.value)
        arc[pragma.name].push(vector)
      }

      // map
      if (token.type === 'map') {
        let map = {}
        map[token.name] = {}

        // walk the map keys
        for (let key of token.values.filter(t => t.type === 'vector')) {

          // reduce to scalar values
          map[token.name][key.name] = key.values.reduce((a, token) => {
            if (isScalar(token)) {
              a.push(token.value)
            }
            return a
          }, [])

          // flatten arrays of one value
          if (map[token.name][key.name].length === 1) {
            map[token.name][key.name] = map[token.name][key.name].pop()
          }
        }

        arc[pragma.name].push(map)
      }
    }
  }

  return arc
}
