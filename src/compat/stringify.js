module.exports = function stringify (obj) {
  if (typeof obj !== 'object') return
  let pragmas = Object.keys(obj)
  let out = ''
  pragmas.forEach(function (pragma, i) {
    let props = obj[pragma]
    out += i === 0
      ? `@${pragma}\n`
      : `\n@${pragma}\n`

    props.forEach(function (prop) {
      if (typeof prop === 'string') {
        out += `${prop}\n`
      }

      if (typeof prop === 'number') {
        out += `${prop}\n`
      }

      if (typeof prop === 'boolean') {
        out += `${prop ? 'true' : 'false'}\n`
      }

      if (typeof prop === 'object') {
        if (Array.isArray(prop)) {
          prop.forEach(p => {
            out += `${p} `
          })
          out += '\n'
        }
        else {
          for (let key in prop) {
            out += `${key}`
            let subs = prop[key]
            for (let property in subs) {
              out += `\n  ${property} ${subs[property]}`
            }
            out += `\n`
          }
        }
      }
    })
  })
  return out
}
