/**
 * predicate for not-empty token
 *
 * @param {token}
 * @returns {boolean}
 */
module.exports = function notempty (t) {
  return !(t.type == 'comment' || t.type == 'newline' || t.type === 'space')
}
