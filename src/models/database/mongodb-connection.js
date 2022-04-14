require('dotenv').config()
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

// get type of connection

let connection
let mongoServer
const connect = async (key) => {
  const url = await getCurrentURI(key)
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  try {
    const db = await mongoose.connect(url, options)
    connection = { db, type: key }
    return db
  } catch (e) {
    console.error(e)
  }
}
const getCurrentURI = async (key) => {
  let currentURI
  if (key === 'memory') {
    mongoServer = await MongoMemoryServer.create()
  }
  switch (key) {
    case 'memory':
      currentURI = mongoServer.getUri() // DB Memory server
      break
    case 'env':
      currentURI = process.env.MONGO_STRING_CONNECTION // DB in .ENV
      break
  }

  return await currentURI
}

const close = async () => {
  if (mongoServer) { // stop only Memory Database
    await mongoose.connection.close()
    await mongoServer.stop()
  }
}
const clear = async () => {
  if (connection && connection.type === 'memory') { // clear only Memory Database
    const collections = mongoose.connection.collections
    for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany()
    }
  }
}

module.exports = {
  connect,
  close,
  clear,
  getCurrentURI
}
