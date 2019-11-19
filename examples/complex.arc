# vectors can only contain scalar values 
# anon vectors are space seperated scalar values on a single line
@vectors
simple vector
one 2 true

# maps are named key/value objects
# map names and keys are strings indented two spaces; values are either scalar values or vectors
@maps
simple 
  key value
  key2 value2

# even though maps values CAN contain vectors they CANNOT contain maps (to discourage nesting)
accounts 
  nested one 2 false
  nest2 three four 5

@named-vectors
# named vectors can be any scalar values: {foo: ['bar', true, 12]}
foo
  bar
  true
  12

# named vector can be a map value (max indentation possible is three levels if you include the pragma)
# {foobar: {foo: ['bar', 'baz', 'buzz']}
foobar
  foo
    bar
    baz
    buzz
