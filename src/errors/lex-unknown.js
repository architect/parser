module.exports = class UnknownCharacterError extends SyntaxError {
  constructor ({ character, line, column }) {
    super(`unknown character "${character}" (line: ${line} column: ${column})`)
    this.line = line
    this.column = column
    this.name = this.constructor.name
  }
}
