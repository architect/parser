/**
 * predicate for empty token
 *
 * @param {token}
 * @returns {boolean}
 */
function isEmpty (t) {
  return t?.type === 'comment' ||
         t?.type === 'newline' ||
         t?.type === 'space'
}

/**
 * predicate for not-empty token
 *
 * @param {token}
 * @returns {boolean}
 */
function isNotEmpty (t) {
  return !(t?.type === 'comment' ||
           t?.type === 'newline' ||
           t?.type === 'space')
}

module.exports = {
  isEmpty,
  isNotEmpty,
}
