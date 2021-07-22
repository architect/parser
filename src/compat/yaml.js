let yaml = require('./vendor/js-yaml.min.js')
let json = require('./json')

module.exports = function parseYAML (text) {
  return json(JSON.stringify(yaml.load(text)))
}
