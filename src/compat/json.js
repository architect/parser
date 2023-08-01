/**
 * Adjusts cardinality of some Architect specific keys to make them nicer to author in JSON, and YAML
 */
module.exports = function parseJSON (text) {
  let json = JSON.parse(text)
  let result = {}

  // Arc pragmas that are already arrays and can pass through as is
  let SKIP = [ 'macros' ]

  // Arc pragmas that are standalone, or that we expect to be objects and needing convertion to arrays
  let CONVERT = [ 'aws', 'cdn', 'macros', 'static' ]

  // Arc pragmas expressed as arrays or objects of items (each of which may be simple and verbose)
  let ARC = [ 'app', 'events', 'http', 'indexes', 'queues', 'scheduled', 'streams', 'ws', 'tables' ]

  Object.entries(json).forEach(([ pragma, values ]) => {
    // Pass through arrays
    if (SKIP.includes(pragma)) {
      if (!isArray(values)) invalidPragma(pragma)
      result[pragma] = values
      return
    }

    // Convert app:name to app:[name]
    if (pragma === 'app' && !isArray(values)) {
      result[pragma] = [ values ]
      return
    }

    // Core Architect pragmas may come as objects or arrays
    if (ARC.includes(pragma)) {
      // Objects of Arc items convert to tuples
      // Before: { get: '/' }
      // After: [ [ 'get', '/' ] ]
      if (isObject(values)) {
        result[pragma] = Object.entries(values).map(([ item, value ]) => {
          if (isString(value)) return [ item, value ]
          if (isObject(value) && !Object.keys(value).length) return item
          if (isObject(value)) return { [item]: value }
        })
        return
      }
      // Objects of Arc items convert to tuples
      // Before: [ { get: '/' } ]
      // After: [ [ 'get', '/' ] ]
      else if (isArray(values)) {
        result[pragma] = values.map(lambda => {
          if (isString(lambda)) return lambda
          else if (isObject(lambda)) {
            let name = Object.keys(lambda)[0]
            // Simple format
            if (isString(lambda[name])) return [ name, lambda[name] ]
            // Verbose format
            else if (isObject(lambda[name])) return lambda
            // Otherwise, it's an invalid Lambda, fall through to error
          }
          // TOML, basically
          else if (isArray(lambda)) return lambda
          invalid(lambda)
        })
        return
      }
      else invalidPragma(pragma)
    }

    // Convert plain objects to tuples (aws, static, etc.)
    // This will add unknown pragmas that are top level objects, too
    if (CONVERT.includes(pragma)) {
      /**/ if (isObject(values))  result[pragma] = remap(values)
      else if (isArray(values))   result[pragma] = values
      else invalidPragma(pragma)
    }

    // Accept foreign pragmas
    // Pass through arrays, or convert plain objects to tuples (aws, static, scheduled)
    if (isObject(values) || isArray(values)) {
      result[pragma] = isObject(values) ? remap(values) : values
      return
    }
  })

  return result
}

let { isArray } = Array
let isObject = i => typeof i === 'object' && !isArray(i)
let isString = i => typeof i === 'string'
function invalidPragma (pragma) {
  throw Error(`Invalid pragma: ${JSON.stringify(pragma, null, 2)}`)
}
function invalid (lambda) {
  throw Error(`Invalid Lambda: ${JSON.stringify(lambda, null, 2)}`)
}
function remap (values) {
  return Object.entries(values).map(([ key, value ]) => {
    if (isArray(value)) return { [key]: value }
    return [ key, value ]
  })
}
