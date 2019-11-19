# [`@architect/parser`](https://www.npmjs.com/package/@architect/parser) [![Travis Build Status](https://travis-ci.com/architect/parser.svg?branch=master)](https://travis-ci.com/architect/parser) [![Appveyor Build Status](https://ci.appveyor.com/api/projects/status/o4gha7lhovdwommh/branch/master?svg=true)](https://ci.appveyor.com/project/ArchitectCI/parser/branch/master) [![codecov](https://codecov.io/gh/architect/parser/branch/master/graph/badge.svg)](https://codecov.io/gh/architect/parser)

> `.arc` is a text format for storing structured data; `@architect/parser`
> is a function that accepts text and returns a plain JavaScript `Object`

The format:

- Starts with a `@pragma`
- Pragmas start with `@`
- Pragmas contain either scalar values, `Vector` or `Map`
- Scalar values are either `String`, `Number` or `Boolean`
- `Vector` values are space seperated scalar values on a single line
- A `Map` is defined by a scalar value followed by Vectors indented two spaces
- Comments follow `#` symbols

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
