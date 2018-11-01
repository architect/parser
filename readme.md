## [`@architect/parser`](https://www.npmjs.com/package/@architect/parser)
[![Build Status](https://travis-ci.com/arc-repos/arc-parser.svg?branch=master)](https://travis-ci.com/arc-repos/arc-parser)

> `.arc` is a simplistic text format for storing structured data; `@architect/parser` is a function that accepts text and returns a plain JavaScript `Object`

The format:

- Starts with a `@section`
- Sections start with `@`
- Sections contain either scalar values, `Vector` or `Map`
- Scalar values are either `String`, `Number` or `Boolean`
- `Vector` values are space seperated scalar values on a single line
- A `Map` is defined by a scalar value followed by Vectors indented two spaces
- Comments follow # symbols

### Install

  npm i arc-parser

### Example Usage

```javascript
var parser = require('arc-parser')
var fs = require('fs')
var text = fs.readFileSync('./some-arc-file.txt').toString()
var result = parse(text)
```

### Example

Input

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

Output
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

### Experimental Support

To facilitate interop the main module exported here has the additional methods that are specific to the Architect .arc format: 

- `parse.json(jsonText)` returns `.arc` compatible `Object`
- `parse.yaml(yamlText)` returns `.arc` compatible `Object`
- `parse.json.stringify` returns `.arc` compatible `String`
- `parse.yaml.stringify` returns `.arc` compatible `String`

It is worth noting that `parse` is a generic `.arc` format parser in a similar vien to yaml and json. the impl above `parse.json` and `parse.yaml` are Architect grammer specific dialects of json and yaml.
