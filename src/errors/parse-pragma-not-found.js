module.exports = class PragmaNotFound extends ReferenceError {
  constructor ({ line, column }) {
    super(`opening @pragma not found (line: ${1} column: ${1})`)
    this.line = line
    this.column = column
    this.name = this.constructor.name
  }
}
