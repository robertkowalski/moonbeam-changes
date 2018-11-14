'use strict'

const express = require('express')
const JSONStringify = require('streaming-json-stringify')
const stream = require('stream')

const app = express()
app.use(express.json())

class ChangesFeed {
  constructor (conf, db, getStatement) {
    this.conf = conf
    this.db = db
    this.server = null
    this.setupRoutes()
    this.getStatement = getStatement
  }

  start (cb) {
    this.db.start((err) => {
      if (err) return cb(err)
      this.listen(cb)
    })
  }

  stop (cb) {
    this.db.stop(cb)
  }

  listen (cb = () => {}) {
    this.server = app.listen(this.conf.port, cb)
  }

  setupRoutes () {
    app.post('/', this.onHttpRequest.bind(this))
  }

  onHttpRequest (req, res) {
    const payload = req.body

    const stmt = this.getStatement(payload)

    const db = this.db
    const dbStream = db.collection.find(stmt, {}).stream()

    stream.pipeline(
      dbStream,
      JSONStringify(),
      res,
      (err) => {
        if (err) console.error(err)
      }
    )
  }
}

function server (opts, db, getStatement) {
  return new ChangesFeed(opts, db, getStatement)
}

module.exports = server
