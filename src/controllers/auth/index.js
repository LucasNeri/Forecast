require('dotenv').config()
const HttpResponse = require('../../helpers/http-response')
const Encripter = require('../../helpers/encrypter')
const TokenHelper = require('../../helpers/token-helper')
const User = require('../../models/user')

class AuthRouter {
  async auth (email, password) {
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    if (!password) {
      return HttpResponse.badRequest('password')
    }
    const usr = new User()
    const user = await usr.getUserByEmail(email)
    const encripter = new Encripter()
    const isValid = user && (await encripter.compare(password, user.password))
    if (isValid) {
      const tokenHelper = new TokenHelper(process.env.TOKEN_SECRET)
      const accessToken = await tokenHelper.generate(user._id)
      return HttpResponse.ok({ accessToken: accessToken })
    }
    return HttpResponse.unauthorized('user unauthorized.')
  }
}

module.exports = AuthRouter
