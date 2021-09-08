module.exports = function isScalar (t) {
  return t.type === 'string' || t.type === 'number' || t.type === 'boolean'
}
