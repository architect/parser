const test = require('tape')
const fs = require('fs')
const parse = require('../')

test('@stringify', t => {
  t.plan(1)
  let mock = fs.readFileSync('./test/00-mock-arc').toString()
  let parsed = parse(mock)
  let actual = parse.stringify(parsed)
  console.log(parsed)
  t.equal(mock, actual, 'Stringified parsed arc file 🙌')
})
