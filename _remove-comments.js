/**
 * removes # comments and trims leading/trailing whitespace
 */
module.exports = function removeComments(text) {
  return text.trim().replace(/\#.*/g, '').replace(/  \n/g, '').trim()
}
