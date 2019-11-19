# @pragmas this schema is concerned with
# by default nothing is required
@pragmas
app
aws
events
http
indexes
macros
queues
scheduled
static
tables
ws

# define the .arc schema itself
@schema
app
  namespace*

aws
  awsconfig*

events
  string

http
  route

macros
  string

queues
  string

scheduled
  rate
  cron

static
  folder
  spa
  fingerprint
  ignore

tables
  table

indexes
  index

ws
  string

# (* star modifier marks a type as required)

@types
namespace
  type string
  max 10
  min 1
  pattern /a-zA-Z/

pair
  type array
  max 2
  min 2

route
  type pair
  first get post put delete patch
  rest string

awsconfig
  type pair
  first region profile bucket
  rest string

folder
  type pair
  first folder
  rest string

spa
  type pair
  first spa
  rest boolean

fingerprint
  type pair
  first fingerprint
  rest boolean

ignore
  type array
  first ignore
  rest string

ignores
  type vector
  name ignore
  pattern string
  min 1

cron
  type map
  min 1
  max 1
  required cron:crontab

# weekly 
#   cron 0/10 * ? * MON-FRI *

crontab
  type array
  min 6
  max 6

rate
  type map
  min 1
  max 1
  required rate:ratevalue

ratevalue
  type pair
  first number
  rest day days hour hours minute minutes second seconds

# daily
#   rate 1 day

table
  type map
  min 1
  max 4
  required *:partition
  optional 
    *:sort 
    *:ttl 
    stream:boolean

index
  type map
  min 1
  max 2
  required *:partition
  optional *:sort

partition
  type string
  match *String *Number

sort
  type string
  match **String **Number

ttl
  type string
  match TTL

# built in types
# ---
# boolean
#  
# number
#   min number
#   max number
# 
# string
#   min number
#   max number
#   match /pattern/ :type stringliteral
#
#  array
#    min number
#    max number
#    first /pattern/ :type stringliteral
#    rest /pattern/ :type stringliteral
#
#  vector
#    name /pattern/ :type stringliteral
#
#  map
#    min number
#    max number
#    required string:type # string is a literal string; colon seperated type is one of string/number/boolean/vector
#    optional string:type # string is a literal string; colon seperated type is one of string/number/boolean/vector
# 
# @types pragma defines custom types
# custom types must define a type; all other properties are optional
#
# type
# - string 
# - number 
# - boolean
# - array
# - vector
# - map
# - another type!
#
# max/min:
# - string (string length)
# - number (maximum number value)
# - boolean (n/a)
# - array (array length)
# - vector (array length)
# - map (number of keys)
#
# first (first value matches)
# - string (n/a)
# - number (n/a)
# - boolean (n/a)
# - array (array[0])
# - vector (array[0])
# - map (keys[0])
#
# (array|vector)#rest (ensure one or more values matches)
# - string
# - number
# - boolean
# - array
# - vector
# - map
# - another type
# 
# required (matches one or more given key:value values))
# - map <K>:<V>
# - another type extending map!
