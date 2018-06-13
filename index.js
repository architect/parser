let _parse = require('./_parse')
let _json = require('./_json')
let _yaml = require('./_yaml')

// to remain backwards compat we augment _parse 
// and treat it as a namespace for these extended fns
// everything is pure here so its cool..
_parse.json = _json
_parse.yaml = _yaml

/**
 * parse 
 * parse .arc text into a js intermediate obj
 *
 * usage
 *   let parse = require('@architect/parser')
 *   parse(txt)
 *
 * ---
 *
 * parse.json 
 * parse json text into a js intermediate obj
 *
 * usage
 *   let parse = require('@architect/parser')
 *   parse.json(txt)
 *
 * ---
 *
 * parse.yaml
 * parse yaml text into a js intermediate obj
 *
 * usage
 *   let parse = require('@architect/parser')
 *   parse.yaml(txt)
 * 
 * ---
 *
 * parse.stringify 
 * stringify intermediate obj to .arc format
 *
 * usage
 *   let parse = require('@architect/parser')
 *   parse.stringify({
 *     app: ['testapp'], 
 *     html:[['get', '/']]
 *   })
 *
 */
module.exports = _parse
