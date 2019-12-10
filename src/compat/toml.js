let toml = require('./iarna-toml-2.2.3')
let json = require('./json')

module.exports = function parseTOML(text) {
  return json(JSON.stringify(toml.parse(text)))
}
