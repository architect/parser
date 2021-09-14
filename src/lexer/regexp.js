// we-like-strings-LikeThisOne_or_2
const DASHERIZED = /^([a-zA-Z0-9_-]+)$/

// Emptyness is not nothingness
const SPACE = / /
const WINDOWS_NEWLINE = /\r\n/
const POSIX_NEWLINE = /(\n|\r)/
const NEWLINE = /(\r\n|\r|\n)/
const TAB = /\t/


/**
 * reserved syntax:
 *
 * - # comments
 * - @ pragmas
 * - \ (we need for c style escaping like \n)
 * - {} braces
 * - [] brackets
 * - <> angle brackets
 *
 * (note: any of those symbols can be quoted)
 */
const PRAGMA = /\@/
const COMMENT = /\#/
const RESERVED = /\{|\}|\[|\]|\<|\>/

/**
 * strings are REALLY loose in .arc formats!
 *
 * this allows to have config with full clean paths like
 * ./../foo/bar/baz.buzz
 *
 * allow:
 *
 * - open paren (
 * - close paren )
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
 * - double quote " is greedy, supports newlines and must have a closing "
 */
const STRING = /(\()|(\))|(\/)|(\w)|(\~)|(-)|(\_)|(\.)|(\,)|(\:)|(\$)|(\*)|(\?)|(\&)|(\!)|(\%)|(\=)|(\+)|(\|)|(\^)|(\`)|(\')|(\")/

/**
 * numbers (integer or float; negative modifier supported)
 */
const NUMBER = /(\-)|(\d)/

/**
 * boolean literal constants: true and false
 */
const BOOLEAN = /(t)|(f)/

module.exports = { DASHERIZED, SPACE, NEWLINE, WINDOWS_NEWLINE, POSIX_NEWLINE, TAB, PRAGMA, COMMENT, RESERVED, STRING, NUMBER, BOOLEAN }
