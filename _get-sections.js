module.exports = function getSections(text) {
  
  if (!text.startsWith('@')) {
    throw SyntaxError(`invalid_arc
An .arc text must have an opening @section.

    `)
  }

  // splits text into array of arrays
  var sections = text.split('@').filter(Boolean).map(c=> c.split(/\r?\n/).filter(Boolean).map(s=>s.trimRight()))
  
  // validates sections
  sections.forEach(section=> {

    // operate on a copy so we don't pollute the text
    var clone = section.slice(0)

    // validate the @section name (must not contain whitespace)
    var name = clone.shift()
    var bad = /\s+/.test(name)
    if (bad) {
       throw SyntaxError(`invalid_section
@sections must be a string of non whitespace characters.
              
Invalid value: "${name}"
       `)  
    }

    // validates section values
    var index = 0
    var lastToken = false
    clone.forEach(val=> {
      // values must start with one or more non whitespace characters
      var isText = /^\S+/.test(val)
      // console.log({val, isText})
      if (!isText) {
        var isDoubleSpaceFollowedByText = /\s{2}\S+/.test(val)
        var followsSingleValueOrDouble = (typeof lastToken === 'string' && !/ /g.test(lastToken)) || /\s{2}\S+/.test(lastToken)
        // console.log({isDoubleSpaceFollowedByText, followsSingleValue, val, lastToken})
        if (!isDoubleSpaceFollowedByText) {
          throw SyntaxError(`invalid_section_value
@section values cannot start with whitespace.

Invalid value: "${val}"
          `)
        }
        else if (isDoubleSpaceFollowedByText && !followsSingleValueOrDouble) {
          // if there is whitespace two spaces is allowed if it is following a simple single value
          throw SyntaxError(`invalid_object
Object name must be a string with no spaces.
              
Invalid value: "${val}"
           `)  
        }
      }
      lastToken = val
      index += 1
    })
  })

  // if we made it here continue exec
  return sections
}
