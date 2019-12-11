/**
 * Adjusts cardinality of some Architect specific keys to make them nicer to author in JSON, YAML and TOML
 *
 */
module.exports = function parseJSON(text) {

  let json = JSON.parse(text)
  let result = {}

  Object.keys(json).forEach(section => {

    // passthru
    let SKIP = ['events', 'queues', 'tables', 'indexes', 'cdn', 'ws']
    if (SKIP.includes(section))
      result[section] = json[section]

    // convert key:value to key:[value] (app)
    if (section === 'app' && Array.isArray(json[section]) === false)
      result[section] = [json[section]]

    // convert plain objects to array (aws, static, scheduled)
    if (Array.isArray(json[section]) === false && typeof json[section] === 'object') {
      if (!result[section])
        result[section] = []
      Object.keys(json[section]).forEach(key=> {
        let value = [key, json[section][key]]
        result[section].push(value)
      })
    }

    // convert array of objects [{get: '/'}] to array of arrays [['get', '/']]
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
    }

  })
  return result
}
