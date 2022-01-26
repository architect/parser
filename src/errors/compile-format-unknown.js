module.exports = class FormatUnknown extends ReferenceError {
  constructor (mode) {
    super(`compiler format unknown: "${mode}"
expected one of these valid values: "js", "json", or "yaml"`)
    this.name = this.constructor.name
  }
}
