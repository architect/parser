let test = require('tape')
let fs = require('fs')
let assert = require('assert-diff')
let parse = require('../')

test('should parse mock arc.json', t=> {
  t.plan(1)
  let mock = fs.readFileSync('./test/mock/arc.json').toString()
  let parsed = parse.json(mock)
  let expected = {
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
        "apigateway",
        "http"
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
  // console.log(parsed, expected)
  t.ok(true, 'parsed json')
})

test('should serialize mock arc.json to .arc', t=> {
  t.plan(1)
  var mock = fs.readFileSync('./test/mock/arc.json', 'utf-8')
  let parsed = parse.json(mock)
  var result = parse.stringify(parsed)
  t.ok(parsed, 'parsed json')
  console.log(result)
})
