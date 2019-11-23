module.exports = class MapNameNotString extends SyntaxError {
  constructor({line, column}) {
    super(`Map name not a string (line: ${line} column: ${column})`)
    this.line = line
    this.column = column
    this.name = this.constructor.name
  }
}
