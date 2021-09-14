module.exports = class MapKeyUndefinedValue extends SyntaxError {
  constructor ({ line, column }) {
    super(`map value undefined (line: ${line} column: ${column})`)
    this.line = line
    this.column = column
    this.name = this.constructor.name
  }
}
