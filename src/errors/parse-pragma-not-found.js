module.exports = class PragmaNotFound extends ReferenceError {
  constructor () {
    super(`Architect files must contain at least one pragma`)
    this.name = this.constructor.name
  }
}
