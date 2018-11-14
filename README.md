# moonbeam-changes

## Setup

```
cp config/moonbeam.mongo.conf.json.example config/moonbeam.mongo.conf.json
```

```
node worker.js 1337
```

Flow:

Client sends latest known entry of sequential data.
This server return the newly added items.


Example: [example.js](example.js)

## Create own MongoDB lookups

The server is started with a parameter called `getStatement` which should return
a MongoDB query statement.

**Example:**

```js
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

```
