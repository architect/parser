var test = require('tape')
var fs = require('fs')
var assert = require('assert-diff')
var parse = require('../')

test('should parse mock arc.json', t=> {
  t.plan(1)
  var mock = fs.readFileSync('./test/05-mock-arc.json').toString()
  var parsed = parse.json(mock)
  const expected = {
    "app": [
      "testapp"
    ],
    "aws": [
      [
        "region",
        "us-west-2"
      ],
      [
        "profile",
        "personal"
      ],
      [
        "runtime",
        "nodejs10.x"
      ],
      [
        "bucket",
        "someapp-preview"
      ]
    ],
    "events": [
      "send-welcome-sms"
    ],
    "http": [
      [
        "get",
        "/http/route"
      ],
      [
        "post",
        "/http/routetwo"
      ]
    ],
    "indexes": [
      {
        "authors": {
          "phone": "*String"
        }
      }
    ],
    "queues": [
      "some-queue"
    ],
    "scheduled": [
      [
        "daily-report",
        "rate(1 day)"
      ]
    ],
    "static": [
      [
        "staging",
        "testapp-bucket"
      ],
      [
        "production",
        "testapp-buckea-prod"
      ]
    ],
    "tables": [
      {
        "notes": {
          "authorID": "*String",
          "noteID": "**String"
        }
      },
      {
        "authors": {
          "authorID": "*String"
        }
      }
    ],
    "ws": []
  }
  assert.deepEqual(parsed, expected)
  
  t.ok(parsed, 'parsed json')
  console.log(JSON.stringify(parsed, null, 2))
})

test('should serialize mock arc.json to .arc', t=> {
  t.plan(1)
  var mock = fs.readFileSync('./test/05-mock-arc.json', 'utf-8')
  var parsed = parse.json.stringify(mock)
  t.ok(parsed, 'parsed json')
  console.log(parsed)
})
