let toml = require('./toml-node-3.0.0')
let json = require('./json')

module.exports = function parseTOML (text) {
  return json(JSON.stringify(toml.parse(text)))
}
