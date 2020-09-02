const {Router} = require('express')

const articlesRouter = require('./articles').route
const profilesRouter = require('./profiles').route
const signupRouter = require('./signup').route
const userRouter = require('./login').route

const route = Router()

route.use('/articles' ,articlesRouter )
route.use('/profile' , profilesRouter)
route.use('/signup' , signupRouter)
route.use('/login' , userRouter)

module.exports = {route}