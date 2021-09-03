module.exports = class VectorNameNotString extends SyntaxError {
  constructor ({ line, column }) {
    super(`vector name is not a string (line: ${line} column: ${column})`)
    this.line = line
    this.column = column
    this.name = this.constructor.name
  }
}
