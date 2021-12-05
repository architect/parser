/**
 * predicate for leading two spaces
 *
 * @param {token}
 * @returns {boolean}
 */
function isTwoSpaces (t) {
  return Array.isArray(t) &&
         t[0]?.type === 'space' &&
         t[1]?.type === 'space'
}

/**
 * predicate for leading four spaces
 *
 * @param {token}
 * @returns {boolean}
 */
function isFourSpaces (t) {
  return Array.isArray(t) &&
         t[0]?.type === 'space' &&
         t[1]?.type === 'space' &&
         t[2]?.type === 'space' &&
         t[3]?.type === 'space'
}

module.exports = {
  isTwoSpaces,
  isFourSpaces,
}
