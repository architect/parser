module.exports = class CloseQuoteNotFoundError extends ReferenceError {
  constructor ({ line, column }) {
    super(`closing quote not found (line: ${line} column: ${column})`)
    this.line = line
    this.column = column
    this.name = this.constructor.name
  }
}
