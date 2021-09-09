let test = require('tape')
let parse = require('../')

test.only('test base mock file', t => {
  t.plan(1)
  let mock = `
@attr
single # future version should support `` style strings which allows multiline
false
1
-1
tuple tuple # inline comment
1 2.1 33 fourtyfour true false v
object
  key value
  gud true
  bad false
# line based comment














another-single_value

another-obj
  $k 666 
  another-key another_value/baz.txt
  undef no# empty key will no longer have a default false value
  asdf 1 2 3 four

spacey    tuple # tuple with lots of spaces
`
  let ast = parse(mock)
  console.dir(ast, { depth: null })
  t.ok(true, 'good job')
})

