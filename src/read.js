let lexer = require('./lexer')
let parser = require('./parser')
let validate = require('./compat/validate')
let json = require('./compat/json')
let yaml = require('./compat/yaml')
let toml = require('./compat/toml')

let fs = require('fs')
let path = require('path')

let read = p=> fs.readFileSync(p).toString()
let exists = fs.existsSync
let join = path.join

let defaultArc = `@app
app-default

@static

@http
`

/**
 * Look up .arc falling back to: app.arc, arc.json, arc.yaml, arc.yml, arc.toml
 *
 * @param {object} params
 * @param {string} params.cwd - path to current working directory (process.cwd() used if not defined)
 * @returns {object} {arc, raw, errors}
 */
module.exports = function readArc(params={}) {

  let cwd = params.cwd || process.cwd()

  let arcDefaultPath = join(cwd, '.arc')
  let appDotArcPath = join(cwd, 'app.arc')
  let arcJsonPath = join(cwd, 'arc.json')
  let arcYamlPath = join(cwd, 'arc.yaml')
  let arcYmlPath = join(cwd, 'arc.yml')
  let arcTomlPath = join(cwd, 'arc.toml')

  let raw
  let arc
  let filepath

  if (exists(arcDefaultPath)) {
    filepath = arcDefaultPath
    raw = read(arcDefaultPath)
    arc = parser(lexer(raw))
  }
  else if (exists(appDotArcPath)) {
    filepath = appDotArcPath
    raw = read(appDotArcPath)
    arc = parser(lexer(raw))
  }
  else if (exists(arcJsonPath)) {
    filepath = arcJsonPath
    raw = read(arcJsonPath)
    arc = json(raw)
  }
  else if (exists(arcYamlPath)) {
    filepath = arcYamlPath
    raw = read(arcYamlPath)
    arc = yaml(raw)
  }
  else if (exists(arcYmlPath)) {
    filepath = arcYmlPath
    raw = read(arcYmlPath)
    arc = yaml(raw)
  }
  else if (exists(arcTomlPath)) {
    filepath = arcTomlPath
    raw = read(arcTomlPath)
    arc = toml(raw)
  }
  else {
    filepath = false
    raw = defaultArc
    arc = parser(lexer(raw))
  }

  let errors = validate(arc)
  return {arc, raw, filepath, errors}
}
