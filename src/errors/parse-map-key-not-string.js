module.exports = class MapKeyNotStrng extends SyntaxError {
  constructor({line, column}) {
    super(`Map key not a string (line: ${line} column: ${column})`)
    this.line = line
    this.column = column
    this.name = this.constructor.name
  }
}
