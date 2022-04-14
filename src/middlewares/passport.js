const HttpResponse = require('../helpers/http-response')
const TokenHelper = require('../helpers/token-helper')

class Authorization {
    async authTokenVerify (req, res, next) {
      try {
        const authorization = req.headers.authorization
        if (!authorization) {
          res
            .status(401)
            .json(
              HttpResponse.unauthorized('User unauthorized, jwt is required.')
            )
        } else {
          if (authorization) {
  
            if(process.env.STATIC_TOKEN === authorization){
              req.userId = process.env.STATIC_USER_ID
              next()
              return next;
            }
  
            const split = authorization.split('Bearer ')
            let token = split[1]
   
            if (split.length !== 2) {
              return res
                .status(401)
                .json(
                  HttpResponse.unauthorized('No Bearer or token is provided.')
                )
            }
  
            const tokenHElper = new TokenHelper(process.env.TOKEN_SECRET)
            const verify = await tokenHElper.tokenVerify(token)
            if (verify._id === undefined) {
              res.status(401).json(HttpResponse.unauthorized(`Failed to authenticate token: ${verify.message}`))
              return
            }
            req.userId = verify._id
            next()
          }
        }
      } catch (error) {
        console.error('ERRO: ', error)
      }
      return next
    }
}

module.exports = Authorization