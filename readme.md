# [`@architect/parser`](https://www.npmjs.com/package/@architect/parser) [![GitHub CI status](https://github.com/architect/parser/workflows/Node%20CI/badge.svg)](https://github.com/architect/parser/actions?query=workflow%3A%22Node+CI%22)
<!-- [![codecov](https://codecov.io/gh/architect/parser/branch/master/graph/badge.svg)](https://codecov.io/gh/architect/parser) -->

> `.arc` is a text format for storing structured data; `@architect/parser`
> is a function that accepts text and returns a plain JavaScript `Object`

The format:

- Comments follow `#` symbols
- Starts with a `@pragma`
- Pragmas start with `@`
- Pragmas contain either scalar values, `Array`, `Vector` or `Map`
- Scalar values are either `String`, `Number` or `Boolean`
- `Array` values are space seperated scalar values on a single line
- `Vector` is a named array with newline seperated scalar values 
- `Map` is defined by a scalar value followed by vectors indented two spaces

## Example

Consider a file `some-arc-file.txt` with the following contents:

```
# this is a comment
@section-one
simple-string-value # String
another-value
4.2 # Number
true # Boolean

@another-section-of-vectors
vector of values
vector tuple

@this-section-has-a-map
hello-world
  name some-value
```

Parsing the file with the following code:

```javascript
#!/usr/bin/env node
const parser = require('@architect/parser')
const fs = require('fs')
const text = fs.readFileSync('./some-arc-file.txt').toString()
const result = parse(text)

console.log(result)
```

Prints the following plain object to the console:

```javascript
{
  "section-one": [
    "simple-string-value",
    "another-value",
    4.2,
    true
  ],
  "another-section-of-vectors": [
    ["vector", "of", "values"],
    ["vector", "tuple"]
  ],
  "this-section-has-a-map": [{
    "hello-world": {
      "name": "some-value"
    }
  }]
}
```

[npm]: https://www.npmjs.com/package/@architect/parser
