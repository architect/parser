module.exports = class MapKeyNotString extends SyntaxError {
  constructor ({ line, column }) {
    super(`map key is not a string (line: ${line} column: ${column})`)
    this.line = line
    this.column = column
    this.name = this.constructor.name
  }
}
