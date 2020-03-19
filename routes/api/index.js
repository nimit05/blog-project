const {Router} = require('express')

const articlesRouter = require('./articles').route
const profilesRouter = require('./profiles').route
const usersRouter = require('./users').route
const userRouter = require('./user').route

const route = Router()

route.use('/articles' ,articlesRouter )
route.use('/profiles' , profilesRouter)
route.use('/users' , usersRouter)
route.use('/user' , userRouter)

module.exports = {route}