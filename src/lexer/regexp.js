// we-like-strings-like-this-one
const DASHERIZED = /^([a-zA-Z0-9_-]+)$/

// Emptyness is not nothingness
const SPACE = / /
const NEWLINE = /(\r\n|\r|\n)/
const TAB = /\t/

/**
 * reserved syntax:
 *
 * - # comments
 * - @ pragmas
 * - \ (we need for c style escaping like \n)
 * - () parens
 * - {} braces
 * - [] brackets
 * - <> angle brackets
 */
const PRAGMA = /\@/
const COMMENT = /\#/
const RESERVED = /\(|\)|\{|\}|\[|\]|\<|\>/

/**
 * strings are REALLY loose in .arc formats!
 *
 * this allows to have config with full clean paths like
 * ./../foo/bar/baz.buzz
 *
 * allow:
 *
 * - slash /
 * - letters
 * - tilde ~
 * - dashes -
 * - underscore _
 * - dot .
 * - comma ,
 * - colon :
 * - dolla $
 * - star * (we use this for **String and *String for succinct Dynamo tables)
 * - question ?
 * - ampersand &
 * - bang !
 * - percent %
 * - equals =
 * - plus +
 * - pipe |
 * - caret ^
 * - backtick `
 * - single quote '
 * - double quote "
 */
const STRING = /(\/)|([a-zA-Z])|(-)|(\_)|(\.)|(\,)|(\:)|(\$)|(\*)|(\?)|(\&)|(\!)|(\%)|(\=)|(\+)|(\|)|(\^)|(\`)|(\')|(\")/

/**
 * numbers (integer or float; negative modifier supported)
 */
const NUMBER = /(\-)|(\d)/

/**
 * arc supports boolean literals: true and false
 */
const BOOLEAN = /(t)|(f)/

module.exports = {DASHERIZED, SPACE, NEWLINE, TAB, PRAGMA, COMMENT, RESERVED, STRING, NUMBER, BOOLEAN}
