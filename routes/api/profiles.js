const {Router} = require('express')
const route = Router()
const{Users} = require('../../data/db')

route.get('/:username' , async(req,res) => {
    const profile = await Users.findOne({
        attributes : ['username' , 'bio' ,'image' , 'following'],
        where : {username : req.params.username}
        

    })

    


    return res.send({profile})
})
 
route.post('/:username/follow' , async(req,res) => {
    const profile = await Users.findOne({
        attributes : ['username' , 'bio' ,'image' , 'following'],
        where : {username : req.params.username}
    })

    profile.following = true
    profile.save().then(function () {})

    return res.send({profile})

})

route.delete('/:username/follow' , async(req,res) => {
    const profile = await Users.findOne({
        attributes : ['username' , 'bio' ,'image' , 'following'],
        where : {username : req.params.username}
    })

  profile.following = false
  profile.save().then(function () {})

  return res.send({profile})


})


module.exports = {route}