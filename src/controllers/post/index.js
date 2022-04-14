const PostDB = require('../../models/post/index')
const HttpResponse = require('../../helpers/http-response')

class PostRouter {
  /**
 * @name Post.getMongoForecast
 * @api {get} 
 * @description Get Forecast by localeId and date
 * @param {int} localeId
 * @param {string} date
 * @returns {object} {{ name: string, state: string, country: string, meteogram: string, data: object, date: string, localeId: number }}
 */
  async getMongoForecast (mongoForecast) {
    try {
      const model = new PostDB()
      const result = await model.getMongoForecast(mongoForecast)

      if (result.statusCode === 200) {
        return result
      }
      return result
    } catch (error) {
      return HttpResponse.serverError()
    }
  }

  /**
   * @name Post.update
   * @api {put}
   * @description Update a Forecast by id
   * @param {int} localeId
   * @param {string} date
   * @param {object} data
   * @param {string} name
   * @param {string} state
   * @param {string} country
   * @param {string} meteogram
   * @returns {object} new a registrer {{ name: string, state: string, country: string, meteogram: string, data: object, date: string, localeId: number }}
   */
  async updateForecast (id, mongoForecast) {
    if (!mongoForecast) {
      return HttpResponse.badRequest(mongoForecast)
    }
    try {
      if (!id) {
        return HttpResponse.badRequestParam('id')
      }
      const model = new PostDB()
      const result = await model.updateForecast(id, mongoForecast)
      if (result.statusCode === 200) {
        return result
      } else {
        return result
      }
    } catch (error) {
      return HttpResponse.serverError()
    }
  }

  /**
   * @name Post.create
   * @api {post}
   * @description Create a new post
   * @param {Express<http>} httpRequest request
   * @returns {object} new a registrer { name: string, state: string, country: string, meteogram: string, data: object, date: string, localeId: number }
   */
  async createForecast (forecast) {
    try {
      if (!forecast) {
        return HttpResponse.badRequest(forecast)
      }
      if (forecast) {
        // producion db
        const business = new PostDB()
        const result = await business.createForecast(forecast)
        if (result.statusCode === 400) {
          return result
        }
        return HttpResponse.created(result)
      }
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
module.exports = PostRouter
