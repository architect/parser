let Ajv = require('./ajv-6.10.2')
let schema = require('../../schema.json')

/**
 * @param {object} arc
 * @returns {boolean|string} returns either 'false' or a string of errors
 */
module.exports = function validate(arc) {
  let defn = new Ajv({allErrors: true})
  let valid = defn.validate(schema, arc)

  let isValid = valid && !defn.errors
  let isInvalid = !valid && defn.errors
  if (isValid) {
    return false
  }
  else if (isInvalid) {
    let message = ['Architect schema validation error']
    let unknownErrors = 0
    let findPragma = /\w+(?=\[)/
    let findPosition = /(?<=[\[])\d+(?=[\]])/
    let pragmas = {
      app: 'app name',
      aws: 'setting',
      events: 'event',
      http: 'route',
      indexes: 'index or key',
      macros: 'macro',
      queues: 'event',
      scheduled: 'event',
      static: 'setting',
      tables: 'table or key',
      ws: 'route',
    }

    for (let error of defn.errors) {
      try {
        // Suss out the pragma and position of the offending statement
        let pragma = error.dataPath.match(findPragma)[0]
        let position = error.dataPath.match(findPosition)[0]
        let offender = arc[pragma][position]

        // Depending on what the user did we may get strings, arrays, or objects
        if (Array.isArray(offender)) {
          offender = offender.join(' ')
        }
        else if (offender instanceof Object) {
          offender = Object.keys(offender)[position]
        }

        let msg = `  @${pragma} invalid ${pragmas[pragma]}: "${offender}"`
        if (!message.includes(msg)) message.push(msg)
      }
      catch (err) {
        ++unknownErrors
      }
    }
    if (message.length > 2) message[0] += 's'
    if (unknownErrors) message.push(`  ${unknownErrors} unknown validation error${unknownErrors > 1 ? 's' : ''}`)
    return message.join('\n')
  }
  // Shouldn't be possible but jic ajv does something funky
  else throw Error('Invalid error reporting state')
}
