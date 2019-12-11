/**
 * Adjusts cardinality of some Architect specific keys to make them nicer to author in JSON, YAML and TOML
 */
module.exports = function parseJSON(text) {

  let SKIP = ['macros', 'events', 'queues', 'tables', 'indexes', 'cdn', 'ws']
  let KNOWN = ['app', 'aws', 'static', 'http', 'scheduled'].concat(SKIP)

  let json = JSON.parse(text)
  let result = {}

  for (let section of Object.keys(json)) {

    // passthru
    if (SKIP.includes(section)) {
      result[section] = json[section]
      continue
    }

    // convert app:name to app:[name]
    if (section === 'app' && Array.isArray(json[section]) === false) {
      result[section] = [json[section]]
      continue
    }

    // convert plain objects to tuples (aws, static, scheduled)
    // this will add unknown pragmas that are top level objects too
    if (Array.isArray(json[section]) === false && typeof json[section] === 'object') {
      if (!result[section])
        result[section] = []
      Object.keys(json[section]).forEach(key=> {
        let value = [key, json[section][key]]
        result[section].push(value)
      })
      continue
    }

    // ensure we add unknown pragmas; just pass thru
    if (Array.isArray(json[section]) && KNOWN.includes(section) === false) {
      result[section] = json[section]
      continue
    }

    // convert array of objects [{get: '/'}] to tuples [['get', '/']]
    if (section === 'http') {
      if (!result[section])
        result[section] = []
      json[section].forEach(route=> {
        if (Array.isArray(route) === false && typeof route === 'object') {
          let verb = Object.keys(route)[0]
          let tuple = [verb, route[verb]]
          result[section].push(tuple)
        }
        else if (Array.isArray(route)) {
          result[section].push(route)
        }
        else {
          throw Error('invalid route type')
        }
      })
      continue
    }

    if (KNOWN.includes(section) && Array.isArray(json[section])) {
      result[section] = json[section]
      continue
    }

    // end of pragma loop
  }

  return result
}
