/**
 * removes leading space, newline and comments
 *
 * @param {array} tokens
 * @returns {array} tokens
 */
module.exports = function trim(tokens) {
  let found = false
  let result = []
  for (let t of tokens) {
    let ignore = t.type == 'space' || t.type == 'newline' || t.type == 'comment'
    if (ignore === false && found === false)
      found = true
    if (found)
      result.push(t)
  }
  return result
}
