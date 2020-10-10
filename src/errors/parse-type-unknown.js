module.exports = class TypeUnknownError extends TypeError {
  constructor ({ line, column }) {
    super(`type unknown (line: ${1} column: ${1})`)
    this.line = line
    this.column = column
    this.name = this.constructor.name
  }
}

