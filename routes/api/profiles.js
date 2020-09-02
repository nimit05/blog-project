const {Router} = require('express')
const route = Router()
const{Users , Articles} = require('../../data/db')
const { authwire } = require('../../middlewires/auth')

route.get('/:username' , async(req,res) => {
    const profile = await Users.findOne({
        where : {username : req.params.username}
    })

    


    return res.send({profile})
})
 
route.post('/:username/follow' , async(req,res) => {
    const profile = await Users.findOne({
        where : {username : req.params.username}
    })

    profile.following = true
    profile.save().then(function () {})

    return res.send({profile})

})

route.delete('/:username/follow' , async(req,res) => {
    const profile = await Users.findOne({
        where : {username : req.params.username}
    })

  profile.following = false
  profile.save()

  return res.send({profile})


})

route.get('/myarticles' , authwire , async(req,res) => {
    const articles = await Articles.findAll({
        where : {authorUsername : req.query.username}
    })
    console.log(articles)

    res.send(articles)
})



module.exports = {route}