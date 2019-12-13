# Goals

- provide a syntax light, readable and writable declarative configuration format
- discourage nesting
- encourage types
- support scalar primitives: `string`, `number` and `boolean`
- support complex types: `array`, `vector` and `map`
- symmetrical schema language
- contextual errors with line numbers

## Issues with prior works

- XML:
  - pros: broad support
  - cons: extremely verbose, complex, and schemas are defined in different language(s)
- JSON: 
  - pros: broad support
  - cons: syntax heavy, also verbose/complex, no comments, encourages nesting
- YAML: 
  - pros: a mirage of broad support behind many non interopable implementations
  - ambiguous whitespace (and resulting poor interop), unfortunately also encourges nesting
- TOML: 
  - pros: clear top level structure, good support for keys and values
  - syntax heavy, does not handle complex nested types very well at all

# Comments

Comments start with a hash symbol `#` and continue until the end of the line. 

# Structure with Pragmas

Pragmas start with an `@` symbol and represent a top level key. Pragmas are collections of values.

### Scalar Values

- `string` is a very loose primitive scalar value; can be quoted 
- `number` is any negative or positive numeric value
- `boolean` represented by either `true` or `false`

### Collection Values

- `array`
- `vector`
- `map`

## Example

The following example demonstrates a pragma with scalar values:

```arc
# this is a comment
@section
stringvalue
1
true
```

Compiles to:

```javascript
{
  section: [
    'stringvalue',
    1,
    true
  ]
}
```

An `array` value is defined by space seperated scalar values on a line:

```arc
@complex
an array of str values
nifty true
volume 11
```

This compiles into an array of tuples:

```javascript
{
  complex: [
    ['an', 'array', 'of', 'str', 'values'],
    ['nifty', true],
    ['volume', 11]
  ]
}
```

A `vector` is a named `array` with scalar values indented two spaces seperated by newlines:

```arc
@vec
myvector
  one
  2
  true
```

```javascript
{
  vec: [
    {myvector: ['one', 2, true]}
  ]
}
```

The final complex type is a `map`:

```arc
@complex
mymap
  mykey myvalue
  another true
  last 1
```  

```javascript
{
  complex: [
    {mymap: {mykey: 'myvalue', another: true, last: 1}}
  ]
}
```

A `map` can contain an `array`:

```arc
@complex
map
  mykey myvalue
  myarr 1 two true
  myvec
    one
    2
    false
```

```javascript
{
  complex: [{
    map: {
      mykey: 'myvalue',
      myarr: [1, 'two', true],
      myvec: ['one', 2, false]
    }
  }]
}
```

This is the maximum nesting possible.

<!--
# Schema and Types

## Schema

## Builtin Types

## Defining Custom Types
-->