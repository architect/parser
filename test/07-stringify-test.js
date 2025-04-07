const test = require('node:test')
const fs = require('fs')
const parse = require('../')

test('parse.stringify', t => {
  t.plan(1)
  let mock = fs.readFileSync('./test/mock/aws.arc').toString()
  let parsed = parse(mock)
  let string = JSON.stringify(parsed)
  let actual = JSON.stringify(parse(parse.stringify(parsed)))
  t.assert.equal(string, actual, 'Stringified parsed arc file 🙌')
})
