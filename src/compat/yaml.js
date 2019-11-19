// vendoring this lib to keep things trim
let yaml = require('./js-yaml-3.13.1.min.js')
let json = require('./json')

function _yaml(text) {
  return json(JSON.stringify(yaml.load(text)))
}

_yaml.stringify = function _stringify(text) {
  return json.stringify(JSON.stringify(yaml.load(text)))
}

module.exports = _yaml
