const express = require('express')
const cors = require('cors')

const { connect } = require('./models/database/mongodb-connection')
const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())
routes(app)
const MongoConnect = async () => await connect('env')
MongoConnect()

app.listen(process.env.PORT || 3000)
console.log(
  `Server running in ${process.env.BASE_URL || 'http://localhost'}:${
    process.env.PORT || 3000
  }`
)

module.exports = app
