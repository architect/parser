/**
 * accepts json text and returns js intermediate obj
 *
 * usage
 *
 *   let parse = require('@architect/parser')
 *   console.log(parse.json(jsontext))
 */
function _json(jsonText) {

  let json = JSON.parse(jsonText)
  let result = {}

  const BASIC_SECTIONS = ['events', 'queues', 'tables', 'indexes', 'slack', 'ws']
  const ARRAY_SECTIONS = ['app', 'domain']
  // A long Array of individual, 2 item Arrays which are actually key: value pairs.
  // Not sure why why is used instead of either an Object
  // Or if, order matters, an array of objects
  // See https://github.com/architect/parser/issues/22
  const OBJECT_TO_ARRAY_OF_ARRAYS_SECTIONS = ['aws', 'static', 'scheduled']
  const ARRAY_OF_OBJECTS_TO_ARRAY_OF_ARRAYS_SECTIONS = ['http']


  // each @section
  Object.keys(json).forEach(section => {

    if (BASIC_SECTIONS.includes(section)) {
      result[section] = json[section]
    }

    if (ARRAY_SECTIONS.includes(section)) {
      result[section] = [json[section]]
    }

    if (OBJECT_TO_ARRAY_OF_ARRAYS_SECTIONS.includes(section)) {
      result[section] = Object.entries(json[section])
    }

    if (ARRAY_OF_OBJECTS_TO_ARRAY_OF_ARRAYS_SECTIONS.includes(section)) {
      result[section] = json[section].map(function(object) {
        return Object.entries(object)[0]
      })
    }
  })
  return result
}

_json.stringify = function _stringify(json) {
  let raw = JSON.parse(json)
  let result = ''
  result += '@app\n'
  result += `${raw.app}\n\n`
  if (raw.aws) {
    result += `@aws\n`
    result += `region ${raw.aws.region}\n`
    result += `profile ${raw.aws.profile}\n`
    if (raw.aws.runtime) {
      result += `runtime ${raw.aws.runtime}\n`
    }

    if (raw.aws.layers) {
      raw.aws.layers.forEach(layer => {
        result += `layer ${layer}\n`
      })
    }
    result += '\n'
  }
  if (raw.static) {
    result += `@static\n`
    result += `staging ${raw.static.staging}\n`
    result += `production ${raw.static.production}\n`
    result += '\n'
  }
  if (raw.http) {
    result += `@http\n`
    raw.http.forEach(route => {
      let verb = Object.keys(route)[0]
      let path = route[verb]
      result += `${verb} ${path}\n`
    })
    result += '\n'
  }

  if (raw.ws) {
    result += `@ws\n\n`
  }

  if (raw.events) {
    result += `@events\n`
    raw.events.forEach(e => {
      result += `${e}\n`
    })
    result += '\n'
  }
  if (raw.tables) {
    result += `@tables\n`
    raw.tables.forEach(table => {
      let name = Object.keys(table)[0]
      let props = Object.keys(table[name])
      result += `${name}\n`
      props.forEach(prop => {
        result += `  ${prop} ${table[name][prop]}\n`
      })
    })
    result += '\n'
  }
  if (raw.indexes) {
    result += `@indexes\n`
    raw.tables.forEach(table => {
      let name = Object.keys(table)[0]
      let props = Object.keys(table[name])
      result += `${name}\n`
      props.forEach(prop => {
        result += `  ${prop} ${table[name][prop]}\n`
      })
    })
    result += '\n'
  }
  if (raw.scheduled) {
    result += `@scheduled\n`
    Object.keys(raw.scheduled).forEach(k => {
      let v = raw.scheduled[k]
      result += `${k} ${v}\n`
    })
    result += '\n'
  }
  if (raw.slack) {
    result += `@slack\n`
    raw.events.forEach(e => {
      result += `${e}\n`
    })
    result += '\n'
  }
  return result
}

module.exports = _json
