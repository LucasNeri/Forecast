const express = require('express')
const routes = express.Router()

const Auth = require('../controllers/auth/index')

// Post Routes
const AuthController = new Auth()

routes.post('/api/login/auth', AuthController.auth)

module.exports = routes
