module.exports = class PragmaSyntaxError extends SyntaxError {
  constructor ({ token, line, column }) {
    super(`pragma "${token}" has illegal character(s) (line: ${line} column: ${column})`)
    this.line = line
    this.column = column
    this.name = this.constructor.name
  }
}
