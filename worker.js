'use strict'

const ObjectId = require('mongodb').ObjectID
const server = require('./server')
const dbConf = require('./config/moonbeam.mongo.conf.json')
const db = require('moonbeam-mongodb')(dbConf)

const PORT = process.argv[2] || 1337

const getStatement = (payload) => {
  const user = payload.user
  const _id = payload.entry._id

  const oid = new ObjectId(_id)
  const stmt = {
    $query: { username: user, _id: { $lt: oid } },
    $orderby: { ts: -1 }
  }

  return stmt
}

const s = server({ port: PORT }, db, getStatement)
s.start()
