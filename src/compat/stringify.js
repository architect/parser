let { isArray } = Array
let isObj = i => typeof i === 'object' && !isArray(i)

module.exports = function stringify (obj) {
  if (!isObj(obj)) return
  let pragmas = Object.keys(obj)
  let out = ''

  function append (item) {
    /**/ if (isArray(item)) for (let i of item) { out += `\n  ${i}` }
    else if (isObj(item))   for (let i in item) { out += `\n  ${i} ${item[i]}` }
    else out += `${item} `
  }

  pragmas.forEach(function (pragma, i) {
    let props = obj[pragma]
    out += i === 0
      ? `@${pragma}\n`
      : `\n@${pragma}\n`
    props.forEach(function (prop) {
      if (typeof prop === 'string') {
        let includesReserved = prop.includes('@') || prop.includes('#')
        out += includesReserved ? `"${prop}"\n` : `${prop}\n`
      }

      if (typeof prop === 'number') {
        out += `${prop}\n`
      }

      if (typeof prop === 'boolean') {
        out += `${prop ? 'true' : 'false'}\n`
      }

      if (isObj(prop)) {
        for (let key in prop) {
          out += `${key} `
          append(prop[key])
          out += `\n`
        }
      }

      if (isArray(prop)) {
        prop.forEach(append)
        out += '\n'
      }
    })
  })
  let result = out.split('\n').map(l => l.trimEnd(l)).join('\n')
  return result
}
