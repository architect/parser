module.exports = class PragmaAlreadyDefined extends ReferenceError {
  constructor ({ value, line, column }) {
    super(`@${value} pragma already defined (line: ${line} column: ${column})`)
    this.line = line
    this.column = column
    this.name = this.constructor.name
  }
}

