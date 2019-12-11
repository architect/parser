let Ajv = require('./ajv-6.10.2')
let schema = require('../../schema.json')

/**
 * @param {object} arc
 * @returns {boolean|array} returns either 'false' or an array of errors
 */
module.exports = function validate(arc) {
  let defn = new Ajv({allErrors: true})
  let valid = defn.validate(schema, arc)
  return valid? false : defn.errors
}
