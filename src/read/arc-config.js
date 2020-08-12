let lexer = require('../lexer')
let parser = require('../parser')
let validate = require('../compat/validate')
let json = require('../compat/json')
let yaml = require('../compat/yaml')
let toml = require('../compat/toml')

let { existsSync: exists, readFileSync } = require('fs')
let { join } = require('path')

let read = p=> readFileSync(p).toString()

/**
 * Look up .arc falling back to: config.arc, arc.json, arc.yaml, arc.yml, arc.toml
 *
 * @param {object} params
 * @param {string} params.cwd - path to current working directory (process.cwd() used if not defined)
 * @returns {object} {arc, raw, errors}
 */
module.exports = function readArc(params={}) {
  let { cwd } = params
  cwd = cwd || process.cwd()

  let arcConfigDefaultPath = join(cwd, 'config.arc')
  let dotArcConfigPath = join(cwd, '.arc-config')
  let arcConfigJsonPath = join(cwd, 'arc-config.json')
  let arcConfigYamlPath = join(cwd, 'arc-config.yaml')
  let arcConfigYmlPath = join(cwd, 'arc-config.yml')
  let arcConfigTomlPath = join(cwd, 'arc-config.toml')

  let raw
  let arc
  let filepath

  if (exists(arcConfigDefaultPath)) {
    filepath = arcConfigDefaultPath
    raw = read(arcConfigDefaultPath)
    arc = parser(lexer(raw))
  }
  else if (exists(dotArcConfigPath)) {
    filepath = dotArcConfigPath
    raw = read(dotArcConfigPath)
    arc = parser(lexer(raw))
  }
  else if (exists(arcConfigJsonPath)) {
    filepath = arcConfigJsonPath
    raw = read(arcConfigJsonPath)
    arc = json(raw)
  }
  else if (exists(arcConfigYamlPath)) {
    filepath = arcConfigYamlPath
    raw = read(arcConfigYamlPath)
    arc = yaml(raw)
  }
  else if (exists(arcConfigYmlPath)) {
    filepath = arcConfigYmlPath
    raw = read(arcConfigYmlPath)
    arc = yaml(raw)
  }
  else if (exists(arcConfigTomlPath)) {
    filepath = arcConfigTomlPath
    raw = read(arcConfigTomlPath)
    arc = toml(raw)
  }
  else {
    filepath = false
    raw = null
    arc = null
  }

  let errors = filepath ? validate({ arc, type: 'arcConfig' }) : null
  return {arc, raw, filepath, errors}
}
