const validateBody = require('../post/validation')
const PostModel = require('./model')
const HttpResponse = require('../../helpers/http-response')

class PostDB {
  constructor (httpResquest) {
    this.httpResquest = httpResquest
  }

  async getMongoForecast (mongoForecast) {
    try {
      const object = {
        'localeId': mongoForecast.localeId,
        'date': mongoForecast.date.toString(),
      }

      const find = await PostModel.findOne(object)

      if (find) {
        return HttpResponse.ok(find)
      }
      return HttpResponse.notFound('id')
    } catch (e) {
      console.error(e)
    }
  }

  async updateForecast (id, forecast) {
    try {
      const { error, isValid } = await validateBody(forecast)
      if (error) {
        return error
      }

      const find = await PostModel.findOne({ _id: id })
      if (isValid) {
        if (find) {
          const result = await PostModel.updateOne({ _id: id }, forecast)
          return HttpResponse.ok(result)
        }
        return HttpResponse.notFound('id')
      }
    } catch (e) {
      console.error(e)
    }
  }

  async createForecast (forecast) {
    try {
      const { error, isValid } = await validateBody(forecast)
      if (error) {
        return error
      }
      const result = await PostModel.create(forecast)
      if (isValid) {
        return result
      }
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = PostDB
