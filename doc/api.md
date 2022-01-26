## Usage

```javascript
let parse = require('@architect/parser')
let {lexer, parser, compiler, json, yaml, stringify} = parse
```

### API

- `parse(code:string) => object` indescriminate lex/parse/compile of text
- `lexer(code:string) => array` lex string into `.arc` recognized lexeme tokens
- `parser(tokens:array) => object` parse lexeme tokens into AST
- `compiler(ast:object, format:string)` compile AST into 'arc', 'js', 'json', or 'yaml'
- `json(code:string) => object` parse JSON text into Architect JSON Schema
- `yaml(code:string) => object` parse YAML text into Architect JSON Schema
- `stringify(json:object) => string` stringify an arcfile instance
- `read(params:object) => object` read an arcfile from the file system
