module.exports = class PragmaNotFound extends ReferenceError {
  constructor({line, column}) {
    super(`arcfile must define an opening @pragma (line: ${1} column: ${1})`)
    this.line = line
    this.column = column
    this.name = this.constructor.name
  }
}
