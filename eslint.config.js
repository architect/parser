const arc = require('@architect/eslint-config')

module.exports = [
  ...arc,
  {
    ignores: [
      '.nyc_output/',
      'coverage/',
      'dist/',
      'mod.test.ts',
      'rollup.config.js',
      'src/compat/vendor/',
      'tmp/',
    ],
  },
]
