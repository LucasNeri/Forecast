const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const uuid = require('uuid')

const postSchema = new Schema({
  _id: { type: String, default: () => uuid.v4() },
  name: {
    type: String,
  },
  meteogram : {
    type: String,
  },
  localeId: {
    type: Number,
  },
  date: {
    type: String,
  },
  state: {
    type: String,
  },
  data: {
    type: Object
  },
  country: {
    type: String,
  }
})

module.exports = model('Post', postSchema.plugin(mongoosePaginate))
