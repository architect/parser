/**
 * removes:
 * - comments
 * - empty lines
 * - trailing spaces
 */
var comments = /\#.*/gm
var emptyLines = /(^[ \t]*\n)/gm
var trailingSpaces = / (\n|\r)/g

module.exports = function removeComments(text) {
  var noComments = text.trim().replace(comments, '').trim()
  var noEmptyLines = noComments.replace(emptyLines, '')
  var noTrailingSpaces = noEmptyLines.replace(trailingSpaces, '\n')
  return noTrailingSpaces
}
