module.exports = class PragmaNotFound extends ReferenceError {
  constructor () {
    super(`@pragma not found`)
    this.name = this.constructor.name
  }
}
