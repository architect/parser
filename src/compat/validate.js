let Ajv = require('./ajv-6.10.2')
let schema = require('../../schema.json')

module.exports = function validate(arc) {
  let defn = new Ajv({allErrors: true})
  let valid = defn.validate(schema, arc)
  return valid? false : defn.errors
}
