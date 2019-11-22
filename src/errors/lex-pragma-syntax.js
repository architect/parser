module.exports = class PragmaSyntaxError extends SyntaxError {
  constructor({token, line, column}) {
    super(`Syntax error pragma contains illegal character(s) "${token}" (line: ${line} column: ${column})`)
    this.line = line
    this.column = column
    this.name = this.constructor.name
  }
}
