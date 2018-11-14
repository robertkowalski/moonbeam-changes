'use strict'

const request = require('request')

const lastEntry = {
  '_id': '5bdaee1f9e7e1a6ec9a2713f',
  'username': 'testuser4321',
  'ts': null,
  'entry': [
    '0',
    'testuser4321',
    'on',
    [
      '193',
      0,
      12345,
      'EOS.USD',
      193,
      1,
      500,
      1,
      'testuser4321'
    ]
  ]
}

request({
  uri: 'http://localhost:1337',
  method: 'POST',
  json: true,
  body: {
    user: 'testuser4321',
    entry: lastEntry
  }
}, (err, res, body) => {
  if (err) throw err

  console.log(body)
})
