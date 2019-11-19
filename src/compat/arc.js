module.exports = function arc(code) {
  return parse(lex(code), schema)
}
