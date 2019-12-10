/**
 * accepts json text and returns js intermediate obj
 *
 * usage
 *
 *   let parse = require('@architect/parser')
 *   console.log(parse.json(jsontext))
 */
module.exports = function parseJSON(jsonText) {

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
