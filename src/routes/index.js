const HandlerHttp = require('../controllers/handlerHttp')
const AuthorizationHttp = require('../middlewares/passport')

module.exports = (router) => {
  // Post router
  const {
    HandlerGetForecast,
  } = new HandlerHttp()

  const {
    authTokenVerify,
  } = new AuthorizationHttp()

  // Route Post With Authorization
  router.post('/api/get-forecast', authTokenVerify, HandlerGetForecast)
}
