@app
myapp

@aws
profile myprofile
region ca-central-1
bucket mybucket-central-1

@cdn
# comment here

@static
folder dist
fingerprint true

@http
get /

@ws
join

@events
foo

@queues
bar

@scheduled
daily rate(1 day)

@macros
storage

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

accounts
  accountID *String

@indexes
accounts
  email *String
