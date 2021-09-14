module.exports = class InvalidArcfile extends ReferenceError {
  constructor () {
    super(`invalid arcfile`)
    this.name = this.constructor.name
  }
}
