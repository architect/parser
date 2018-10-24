/**
 * accepts json text and returns js intermediate obj
 *
 * usage
 *   
 *   let parse = require('@architect/parser')
 *   console.log(parse.json(jsontext))
 */
function _json(raw) {

  let json = JSON.parse(raw)  
  let result = {}

  // each @section
  Object.keys(json).forEach(section=> {

    if (section === 'app')
      result.app = [json[section]]

    if (section === 'domain')
      result.domain = [json[section]]

    if (section === 'aws') {
      result.aws = [
        ['region', json[section].region], 
        ['profile', json[section].profile]
      ]
    }

    if (section === 'static') {
      result.static = [
        ['staging', json[section].staging], 
        ['production', json[section].production]
      ]
    }

    if (section === 'http') {
      result.http = json[section].map(route=> {
        let method = Object.keys(route)[0]
        let path = route[method]
        return [method, path]
      })
    }

    if (section === 'events')
      result.events = json[section]

    if (section === 'queues')
      result.queues = json[section]

    if (section === 'tables')
      result.tables = json[section]

    if (section === 'indexes')
      result.indexes= json[section]

    if (section === 'scheduled') {
      result.scheduled = []
      Object.keys(json[section]).forEach(name=> {
        let val = json[section][name]
        result.scheduled.push([name, val])
      })
    }

    if (section === 'slack')
      result.slack = json[section]

    // TODO START OF DEPRECATED METHODS
    if (section === 'html') {
      result.html = json[section].map(route=> {
        let method = Object.keys(route)[0]
        let path = route[method]
        return [method, path]
      })
    }

    if (section === 'css')
      result.css = json[section]

    if (section === 'js')
      result.js = json[section]

    if (section === 'text')
      result.text = json[section]

    if (section === 'json') {
      result.json = json[section].map(route=> {
        let method = Object.keys(route)[0]
        let path = route[method]
        return [method, path]
      })
    }

    if (section === 'xml') {
      result.xml = json[section].map(route=> {
        let method = Object.keys(route)[0]
        let path = route[method]
        return [method, path]
      })
    }
    // TODO END DEPRECATED


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
    raw.http.forEach(route=> {
      let verb = Object.keys(route)[0]
      let path = route[verb]
      result += `${verb} ${path}\n`
    })
    result += '\n'
  }
  // TODO START DEPREC
  if (raw.html) {
    result += `@html\n`
    raw.html.forEach(route=> {
      let verb = Object.keys(route)[0]
      let path = route[verb]
      result += `${verb} ${path}\n`
    })
    result += '\n'
  }
  if (raw.css) {
    result += `@css\n`
    raw.css.forEach(route=> {
      result += `${route}\n`
    })
    result += '\n'
  }
  if (raw.js) {
    result += `@js\n`
    raw.js.forEach(route=> {
      result += `${route}\n`
    })
    result += '\n'
  }
  if (raw.text) {
    result += `@text\n`
    raw.text.forEach(route=> {
      result += `${route}\n`
    })
    result += '\n'
  }
  if (raw.json) {
    result += `@json\n`
    raw.json.forEach(route=> {
      let verb = Object.keys(route)[0]
      let path = route[verb]
      result += `${verb} ${path}\n`
    })
    result += '\n'
  }
  if (raw.xml) {
    result += `@xml\n`
    raw.xml.forEach(route=> {
      let verb = Object.keys(route)[0]
      let path = route[verb]
      result += `${verb} ${path}\n`
    })
    result += '\n'
  }
  // TODO END DEPREC
  if (raw.events) {
    result += `@events\n`
    raw.events.forEach(e=> {
      result += `${e}\n`
    })
    result += '\n'
  }
  if (raw.tables) {
    result += `@tables\n`
    raw.tables.forEach(table=> {
      let name = Object.keys(table)[0]
      let props = Object.keys(table[name])
      result += `${name}\n`  
      props.forEach(prop=> {
        result += `  ${prop} ${table[name][prop]}\n`
      })
    })
    result += '\n'
  }
  if (raw.indexes) {
    result += `@indexes\n`
    raw.tables.forEach(table=> {
      let name = Object.keys(table)[0]
      let props = Object.keys(table[name])
      result += `${name}\n`  
      props.forEach(prop=> {
        result += `  ${prop} ${table[name][prop]}\n`
      })
    })
    result += '\n'
  }
  if (raw.scheduled) {
    result += `@scheduled\n`
    Object.keys(raw.scheduled).forEach(k=> {
      let v = raw.scheduled[k]
      result += `${k} ${v}\n`
    })
    result += '\n'
  }
  if (raw.slack) {
    result += `@slack\n`
    raw.events.forEach(e=> {
      result += `${e}\n`
    })
    result += '\n'
  }
  return result
}

module.exports = _json
