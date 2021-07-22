let toml = require('./vendor/toml.min.js')
let json = require('./json')

module.exports = function parseTOML (text) {
  return json(JSON.stringify(toml.parse(text)))
}
