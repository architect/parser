# define the .arc schema in itself
#
# @schema defines @pragmas
# leading : colon operator signals 'this is a :type'
# trailing ! bang operator signals 'this :type is required'
# trailing ? question operator signals 'this :type is defined once or zero times'
@schema

# define @app namespace
app
  :namespace!

# @aws and bucket are required
aws
  :bucket!
  :region?
  :profile?
  :runtime?

# zero config! (zero or more of this pragma is ok; basically a noop for docs)
cdn

# defines @events with zero or more string values
events
  :string

# defines @http with :route values
http
  :route

macros
  :string

queues
  :string

scheduled
  :rate
  :cron

static
  :fingerprint
  :folder
  :ignore
  :prefix
  :prune
  :spa

tables
  :table

indexes
  :index

ws
  :string

# @types (builtins :string :number :boolean :array :vector :map)
@types
namespace
  type :string
  max 10
  min 1
  match /^[a-z][a-z|\\-|0-9]+$/

pair
  type :array
  max 2
  min 2

# @aws
bucket
  type :pair
  first bucket
  rest :string

region
  type :pair
  first region
  rest :string

profile
  type :pair
  first profile
  rest :string

runtime
  type :pair
  first runtime
  rest
    nodejs10.x
    python3.8
    ruby2.5
    java8
    go1.x
    dotnetcore2.1

# @http
route
  type :pair
  first get post put delete patch
  rest :string

# @static
fingerprint
  type :pair
  first fingerprint
  rest :boolean :string

folder
  type :pair
  first folder
  rest :string

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

prefix
  type :array
  first prefix
  rest :string

prune
  type :pair
  first prune
  rest :boolean

spa
  type :pair
  first spa
  rest :boolean

# @scheduled
# weekly
#   cron 0/10 * ? * MON-FRI *
# daily
#   rate 1 day
cron
  type :map
  min 1
  max 1
  required cron:crontab

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

# @tables
table
  type :map
  min 1
  max 4
  required :partition
  optional :sort :ttl stream:boolean

index
  type :map
  min 1
  max 2
  required :partition
  optional :sort

partition
  type :string
  match *String *Number *string *number

sort
  type :string
  match **String **Number **string **number

ttl
  type :string
  match TTL
