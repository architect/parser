const DASHERIZED = /^([a-zA-Z0-9_-]+)$/
const SPACE = / /
const NEWLINE = /(\r\n|\r|\n)/
const PRAGMA = /\@/
const COMMENT = /\#/

/**
 * strings are REALLY loose in .arc formats!
 *
 * this allows to have config with full clean paths like
 * ./../foo/bar/baz.buzz
 *
 * not allowed:
 *
 * - # (not disallowed so much as will ovrride TODO escape \#)
 * - @
 * - \ (we need for c style escaping like \n)
 *
 * alloweds:
 *
 * slashes /
 * letters
 * tilde ~
 * dashes -
 * underscore _
 * dot .
 * dolla $
 * star * (we use this for **String and *String for succinct Dynamo tables)
 * single and double quote (TODO impl "" and '' capture)
 * comma ,
 * colon :
 * question ?
 * ampersand &
 * bang !
 * percent %
 * equals =
 * plus +
 *
 * possible reserved syntax:
 *
 * backtick `
 * pipe |
 * caret ^
 * parens ()
 * braces {}
 * brackets []
 * angle brackets <>
 *
 */
const STRING = /(\/)|([a-zA-Z])|(-)|(\_)|(\.)|(\$)|(\*)|(\')|(\")/

/**
 * numbers can be floats
 * will tokenize as a string so as not to be lossy (this burned us w slack client ids..)
 * (open q: allow for comma?)
 * TODO impl e notation (relaxing e and +)//^\-?\d*\.?\d*$/
 */
const NUMBER = /(\-)|(\d)/

/**
 * arc supports boolean literals: true and false
 */
const BOOLEAN = /(t)|(f)/

module.exports = {DASHERIZED, SPACE, NEWLINE, PRAGMA, COMMENT, STRING, NUMBER, BOOLEAN}
