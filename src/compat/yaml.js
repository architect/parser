let yaml = require('./js-yaml-3.13.1.min.js')
let json = require('./json')

module.exports = function parseYAML (text) {
  return json(JSON.stringify(yaml.load(text)))
}
