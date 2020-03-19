const {Router} = require('express')
const route = Router()
const {createusers} = require('../../controllers/users')

route.post('/' , async (req,res) => {
    let u = req.body.user
    const auth = await createusers(
        u.username,
        u.email,
        u.password,
        u.bio,
        u.image,
        false
  )
    res.send(auth)
})

module.exports = {route}