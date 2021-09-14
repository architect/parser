module.exports = class InvalidTokensError extends SyntaxError {
  constructor (tokens) {
    super(`invalid tokens`)
    this.tokens = tokens
    this.name = this.constructor.name
  }
}
