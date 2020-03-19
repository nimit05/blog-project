const {Router} = require('express')
const route = Router()
const {authwire} = require('../../middlewires/auth')
const {Users} = require('../../data/db')


route.get('/' , authwire, async (req,res) => {
  return res.send(req.user)
})

route.put('/' ,authwire , async(req , res) => {

  let a = req.body.user

  const update = await Users.findOne({
    attributes : [
      'username' , 'email' , 'bio' 
      ,'image' 
    ],
    where : {token : req.user.token}
  })

update.username = a.username
update.save().then(function () {})

update.email = a.email
update.save().then(function () {})

update.bio = a.bio
update.save().then(function () {})

update.image = a.image
update.save().then(function () {})

return res.send(update)

})

module.exports = { route }