# [`@architect/parser`](https://www.npmjs.com/package/@architect/parser) [![GitHub CI status](https://github.com/architect/parser/workflows/Node%20CI/badge.svg)](https://github.com/architect/parser/actions?query=workflow%3A%22Node+CI%22)
<!-- [![codecov](https://codecov.io/gh/architect/parser/branch/master/graph/badge.svg)](https://codecov.io/gh/architect/parser) -->

> `.arc` is a simplistic text format for storing structured data; `@architect/parser`
> is a function that accepts text and returns a plain JavaScript `Object`

The format:

- Starts with a `@section`
- Sections start with `@`
- Sections contain either scalar values, `Vector` or `Map`
- Scalar values are either `String`, `Number` or `Boolean`
- `Vector` values are space seperated scalar values on a single line
- A `Map` is defined by a scalar value followed by Vectors indented two spaces
- Comments follow `#` symbols

## Install

    npm i @architect/parser

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

Running the following inside nodejs:

```javascript
var parser = require('@architect/parser')
var fs = require('fs')
var text = fs.readFileSync('./some-arc-file.txt').toString()
var result = parse(text)
```

Would yield the following:

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

## API

### `parse(text)`

Takes as input raw `.arc` file text and outputs an @architect parsed `Object`.

### `parse.json(jsonText)`

Takes as input raw JSON text representing an @architect parsed `Object` and
trims it down to only relevant @architect `Object` properties.

### `parse.yaml(yamlText)`

Takes as input raw YAML text representing an @architect parsed `Object`,
converts it to JSON and trims it down to only relevant @architect `Object` properties.

[npm]: https://www.npmjs.com/package/@architect/parser
