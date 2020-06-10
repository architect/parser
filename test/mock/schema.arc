# define the .arc schema in itself
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
  fingerprint
  folder
  ignore
  prefix
  prune
  spa

tables
  table

indexes
  index

ws
  string

# (* star modifier marks a type as required)
# all types are colon prefixed :string :number :boolean :vector :map
@types
namespace
  type :string
  max 10
  min 1
  pattern /a-zA-Z/

pair
  type :array
  max 2
  min 2

route
  type :pair
  first get post put delete patch
  rest :string

awsconfig
  type :pair
  first region profile bucket
  rest :string

folder
  type :pair
  first folder
  rest :string

spa
  type :pair
  first spa
  rest :boolean

fingerprint
  type :pair
  first fingerprint
  rest :boolean

ignore
  type :array
  first ignore
  rest :string

ignores
  type :vector
  name ignore
  first :string
  rest :string
  min 1

cron
  type :map
  min 1
  max 1
  required cron:crontab

# weekly
#   cron 0/10 * ? * MON-FRI *

crontab
  type :array
  min 6
  max 6

rate
  type :map
  min 1
  max 1
  required rate:ratevalue

ratevalue
  type :pair
  first :number
  rest day days hour hours minute minutes second seconds

# daily
#   rate 1 day

table
  type :map
  min 1
  max 4
  required *:partition
  optional *:sort *:ttl stream:boolean

index
  type :map
  min 1
  max 2
  required *:partition
  optional *:sort

partition
  type :string
  match *String *Number

sort
  type :string
  match **String **Number

ttl
  type :string
  match TTL
