let test = require('tape')
let parse = require('../')

/* lex errors */

test('pragma errors', t=> {
  t.plan(2)
  try {
    parse(`@pragm&`)
  }
  catch(e) {
    t.ok(e.name === 'PragmaSyntaxError', e.name)
    t.ok(e.line === 1, 'line one')
    console.log(e)
  }
})

test('missing end quote', t=> {
  t.plan(2)
  try {
    parse(`@pragma
    "uh oh`)
  }
  catch(e) {
    t.ok(e.name === 'CloseQuoteNotFoundError', e.name)
    t.ok(e.line === 2, 'on line two')
    console.log(e)
  }
})

test('unknown! (you can quote this to get it working)', t=> {
  t.plan(2)
  try {
    parse(`🤠`)
  }
  catch(e) {
    t.ok(e.name === 'UnknownCharacterError', e.name)
    t.ok(e.line === 1, 'on line one')
    console.log(e)
  }
})

/* parse errors */

test('array space error', t=> {
  t.plan(2)
  try {
    parse(`@pragma
arr val here
 uh oh`)
  }
  catch(e) {
    t.ok(e.name === 'SpaceError', e.name)
    t.ok(e.line === 3, e.message)
    console.log(e)
  }
})

test('map space error', t=> {
  t.plan(2)
  try {
    let arcfile = `@pragma
map
  two space
 uh oh
 `
    let result = parse(arcfile)
    console.log(arcfile, result)
  }
  catch(e) {
    t.ok(e.name === 'SpaceError', e.name)
    t.ok(e.line === 4, e.message)
    console.log(e)
  }
})

test('map space error', t=> {
  t.plan(2)
  try {
    let arcfile = `@pragma
map
  two space
   uh oh
 `
    let result = parse(arcfile)
    console.log(arcfile, result)
  }
  catch(e) {
    t.ok(e.name === 'SpaceError', e.name)
    t.ok(e.line === 4, e.message)
    console.log(e)
  }
})

test('map space error', t=> {
  t.plan(2)
  try {
    let arcfile = `@pragma
map
  two space
     uh oh
 `
    let result = parse(arcfile)
    console.log(arcfile, result)
  }
  catch(e) {
    t.ok(e.name === 'SpaceError', e.name)
    t.ok(e.line === 4, e.message)
    console.log(e)
  }
})

test('map key not string error', t=> {
  t.plan(2)
  try {
    let arcfile = `@pragma
map
  two space
  true oh
 `
    let result = parse(arcfile)
    console.log(arcfile, JSON.stringify(result, null, 2))
  }
  catch(e) {
    t.ok(true, e.name)
    t.ok(e.line === 4, 'on line 4')
    console.log(e)
  }
})

test('map name not string error', t=> {
  t.plan(1)
  try {
    let arcfile = `@pragma
1
  one oh
 `
    let result = parse(arcfile)
    console.log(arcfile, JSON.stringify(result, null, 2))
  }
  catch(e) {
    t.ok(true, e.name)
    // t.ok(e.line === 4, 'on line 4')
    console.log(e)
  }
})

test('map vec name not string error', t=> {
  t.plan(2)
  try {
    let arcfile = `@pragma
map
  ruh roh
  true
    uh
    oh
 `
    let result = parse(arcfile)
    console.log(arcfile, JSON.stringify(result, null, 2))
  }
  catch(e) {
    t.ok(true, e.name)
    t.ok(e.line === 4, 'on line 4')
    console.log(e)
  }
})
