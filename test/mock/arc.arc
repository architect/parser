@app
testapp

@aws
runtime nodejs10.x
region us-west-1
profile work
bucket mahbukkitt

@static
fingerprint true
folder dist
ignore yep
spa true
staging a-bucket
production another-bucket

@http
get    /
post   /post
put    /put
patch  /patch
delete /delete

@ws

@events
an-event
another-event

@scheduled
daily-foo rate(1 day)

@queues
a-queue
another-queue
so-many-queues

@tables
data
  ID *String
  key **String

moreData
  ID *String
  key **String

@indexes
data
  anotherID *Number
  anotherKey **String

moreData
  anotherID *Number
