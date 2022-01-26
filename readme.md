# [`@architect/parser`](https://www.npmjs.com/package/@architect/parser) [![GitHub CI status](https://github.com/architect/parser/workflows/Node%20CI/badge.svg)](https://github.com/architect/parser/actions?query=workflow%3A%22Node+CI%22)
<!-- [![codecov](https://codecov.io/gh/architect/parser/branch/master/graph/badge.svg)](https://codecov.io/gh/architect/parser) -->

OpenJS Architect is an Infrastructure as Code (IaC) solution. The critical insight of *Infastructure as Code* is determinism. Infrastructure resources are defined in a declarative manifest file with the code that depends on them. This ensures deployment artifacts alway have the exact runtime resources expected for every version of the code.

Architect looks in the following places for the primary definition/configuration manifest file:

- `.arc`
- `app.arc` - [example](/examples/arc.arc)
- `arc.json` - [example](/examples/arc.json) - [schema](https://arc.codes/schema.json)
- `arc.yaml` - [example](/examples/arc.yml)

> The `.arc` format is unique to Architect with many readability advantages; but is *not required*

---

# `.arc`

> `.arc` is a text format for storing structured configuration data; it is not for serializing or transporting data

The `.arc` format:

- Comments follow `#` symbols
- Top level keys start with `@` (example: `@pragma`)
- Pragmas contain: scalar values or complex values
- Scalar values are: `string`, `number` and `boolean`
- Complex values are: `array`, `vector` and `map`
- Whitespace is significant

## Example

Consider a file `some-arc-file.txt` with the following contents:

```
# this is a comment
@section-one
simple-string-value # String
another-value
4.2 # Number
true # Boolean

@section-of-arrays
vector of values
vector tuple

@vectors-section
named
  vector
  of
  values

@this-section-has-a-map
hello-world
  name some-value
```

Parsing the file with the following code:

```javascript
#!/usr/bin/env node
const parse = require('@architect/parser')
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
  "section-of-arrays": [
    ["vector", "of", "values"],
    ["vector", "tuple"]
  ],
  "vectors-section": [
    {named: ["vector", "of", "values"]},
  ],
  "this-section-has-a-map": [{
    "hello-world": {
      "name": "some-value"
    }
  }]
}
```

Things to notice:

- `array` values are space seperated scalar values on a single line
- `vector` is a named `array` with scalar values indented two spaces on newlines
- `map` is a named value followed by keys and values indented two spaces

[npm]: https://www.npmjs.com/package/@architect/parser
