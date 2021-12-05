/** reduce array of tokens toString */
module.exports = function toString (str = '', value) {
  if (value.type !== 'newline') {
    str += value.value
  }
  return str
}
