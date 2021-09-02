let test = require('tape')
let parse = require('../')

/* lex errors */

test('pragma errors', t => {
  t.plan(2)
  try {
    parse.lexer(`@pragm&`)
  }
  catch (e) {
    t.ok(e.name === 'PragmaSyntaxError', e.name)
    t.ok(e.line === 1, 'line one')
    console.log(e)
  }
})

test('missing end quote', t => {
  t.plan(2)
  try {
    parse.lexer(`@pragma
    "uh oh`)
  }
  catch (e) {
    t.ok(e.name === 'CloseQuoteNotFoundError', e.name)
    t.ok(e.line === 2, 'on line two')
    console.log(e)
  }
})

test('unknown! (you can quote this to get it working)', t => {
  t.plan(2)
  try {
    parse.lexer(`🤠`)
  }
  catch (e) {
    t.ok(e.name === 'UnknownCharacterError', e.name)
    t.ok(e.line === 1, 'on line one')
    console.log(e)
  }
})

/* parse errors */

test('InvalidTokens', t => {
  t.plan(1)
  try {
    parse.ast('blep')
  }
  catch (e) {
    t.ok(e.name === 'InvalidTokensError', 'got an InvalidTokensError')
    console.log(e)
  }
})

// context; this was an error in parser 4.x and lower
test('array space; not an error!', t => {
  t.plan(1)
  let value = parse.ast(parse.lexer(`
@pragma
arr val here
 uh oh`))
  t.ok(value, 'did not parse')
  console.dir(value, { depth: null })
})

// context; this was an error in parser 4.x and lower
test('map space; not an error!', t => {
  t.plan(1)
  let arcfile = `@pragma
map
  two space
 uh oh
 `
  let tokens = parse.lexer(arcfile)
  let ast = parse.ast(tokens)
  t.ok(ast)
  console.dir(ast, { depth: null })
})

// context; this was an error in parser 4.x and lower
test('map space; not an error!', t => {
  t.plan(1)
  let arcfile = `@pragma
map
  two space
    uh oh
 `
  let tokens = parse.lexer(arcfile)
  let ast = parse.ast(tokens)
  t.ok(ast)
  console.dir(ast, { depth: null })
})

test('map name not string error', t => {
  t.plan(2)
  try {
    let arcfile = `@pragma
1
  one oh
 `
    let result = parse(arcfile)
    console.log(arcfile, JSON.stringify(result, null, 2))
  }
  catch (e) {
    t.same(e.name, 'MapNameNotString')
    t.ok(e.line === 2, 'on line 2')
    console.log(e)
  }
})

test('map key not string error', t => {
  t.plan(2)
  try {
    let arcfile = `@pragma
map
  two space
  true oh
 `
    let result =  parse.ast(parse.lexer(arcfile))
    console.dir(result, { depth: null })
    console.log(arcfile)
    t.fail()
  }
  catch (e) {
    t.same('MapKeyNotString', e.name)
    t.ok(e.line === 4, 'on line 4')
    console.log(e)
  }
})

/*
test.o nly('map vec name not string error', t => {
  t.plan(2)
  try {
    let arcfile = `@pragma
map
  ruh roh
  true
    uh
    oh
 `
    let result = parse.ast(parse.lexer(arcfile))
    console.log(arcfile, JSON.stringify(result, null, 2))
    t.fail()
  }
  catch (e) {
    t.ok(true, e.name)
    t.ok(e.line === 4, 'on line 4')
    console.log(e)
  }
})*/
