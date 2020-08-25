const {Router} = require('express')
const route = Router()
const {authwire} = require('../../middlewires/auth')
const {Users} = require('../../data/db')


route.post('/' , async (req,res) => {
  
    const auth = await Users.findOne({
      where : {username : req.body.username}
    })
    if(!auth){
        res.send ({error: 'No user found with that username'})
    }
    if(req.body.password != auth.password){
      res.send ({error: 'Password does not match'})
    }
    else{
      req.session.token = auth.token;
      req.session.save();
      res.send(auth)
    }  
  
})

route.put('/'  , async(req , res) => {

  let a = req.body.user

  const update = await Users.findOne({
    attributes : [
      'username' , 'email' 
    ],
    where : {token : req.user.token}
  })

update.username = a.username
update.save()

update.email = a.email
update.save()

update.bio = a.bio
update.save()

update.image = a.image
update.save()

return res.send(update)

})

route.delete('/'  , authwire ,  async (req,res) => {
  try
      {
        req.session.token = null;
      req.session.save();
      res.send(true)
    }
    catch(err){
      res.send({error : 'Error Occured'})
    }

})

module.exports = { route }