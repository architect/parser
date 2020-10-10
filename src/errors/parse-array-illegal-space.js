module.exports = class SpaceError extends SyntaxError {
  constructor ({ line, column }) {
    super(`illegal indent (line: ${line} column: ${column})`)
    this.line = line
    this.column = column
    this.name = this.constructor.name
  }
}
