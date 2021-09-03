# AST nodes 

`@architect/parser` defines a liberal structured text format that allows for simple sclar types (string, number and boolean) as well as comments, and complex types (array, vector, and map) using significant whitespace. Significant whitespace is deliberately constrained to discouage deep nesting. The abstract syntax tree (AST) should allow parsing arcfile text and compiling into JSON, YAML, TOML or back into arcfile text.

## Required properties

- `type` the AST node type
- `line` the source line number
- `column` the source column number

## Optional properties 

- `name` the AST node name value
- `value` the AST node value
- `values` the AST node array of values
- `raw` the AST node line raw string (for accessing inline comments)

## AST node types

AST node property `type` can be grouped 'empty', 'scalar' and 'complex' values.

### Empty types 

Empty types always have a value property.

- `newline`
- `comment`
- `space`

```javascript
{ type: 'newline', value: '\n' }
```

```javascript
{ type: 'comment', value: '# hello' }
```

```javascript
{ type: 'space', value: ' ' }
````

### Scalar types 

Scalar types always have a `value` property.

- `string`
- `number`
- `boolean`

```javascript
{ type: 'string', value: 'hi' }
```

```javascript
{ type: 'number', value: 1 }
```

```javascript
{ type: 'boolean', value: true }
```

### Complex types

Always have a `raw` and `values` property; often have a `name` property.

### `arcfile`

- can only be the root node
- can only contain pragma and empty nodes
- pragma must be unique
- must contain at least one pragma
- ex. { type: 'arcfile', values: [{ type: 'pragma', name: 'example', values: [] }] }

### `pragma`

- ??? eats init newline
- has name property
- raw will contain full text including any inline comment
- values can be empty and scalar types
- values can also array, vector, and map
- ex. { type: 'pragma', name: 'example', raw: 'example # w comment', values: []}

### `array`

- can only contain empty and scalar values
- ex. { type: 'array', values: [{type: 'newline', value: '\n'}, {type:'number', value: 2}, {type:'string', value: 'hi'}]}

### `vector`

  - eats initial newline
  - can only contain empty and scalar values
  - has name property
  - raw property will contain full text including comments
  - { type: 'vector', name: 'stuff', values: []}

### `map`

- eats initial newline
- can only contain empty, and vector values
- has name property
- raw property will contain full text including comments
- { type: 'map', name: 'cats', values: [{type: 'key', name: 'catID', values: []}]}
