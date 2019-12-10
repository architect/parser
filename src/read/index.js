let lexer = require('../lexer')
let parser = require('../parser')
let validate = require('../compat/validate')
let json = require('../compat/json')
let yaml = require('../compat/yaml')
let toml = require('../compat/toml')

let fs = require('fs')
let path = require('path')

let read = p=> fs.readFileSync(p).toString()
let exists = fs.existsSync
let join = path.join

/**
 * Look up .arc falling back to:
 *
 * @param {object} params
 * @param {string} params.cwd - path to current working directory (process.cwd() used if not defined)
 */
module.exports = function readArc(params={}) {

  let cwd = params.cwd || process.cwd()

  let arcDefaultPath = join(cwd, '.arc')
  let appDotArcPath = join(cwd, 'app.arc')
  let arcJsonPath = join(cwd, 'arc.json')
  let arcYamlPath = join(cwd, 'arc.yaml')
  let arcTomlPath = join(cwd, 'arc.toml')

  let raw
  let arc

  if (exists(arcDefaultPath)) {
    raw = read(arcDefaultPath)
    arc = parser(lexer(raw))
  }
  else if (exists(appDotArcPath)) {
    raw = read(appDotArcPath)
    arc = parser(lexer(raw))
  }
  else if (exists(arcJsonPath)) {
    raw = read(arcJsonPath)
    arc = json(raw)
  }
  else if (exists(arcYamlPath)) {
    raw = read(arcYamlPath)
    arc = yaml(raw)
  }
  else if (exists(arcTomlPath)) {
    raw = read(arcTomlPath)
    arc = toml(raw)
  }
  else {
    throw Error('not_found')
  }

  let errors = validate(arc)
  return {arc, raw, errors}
}
