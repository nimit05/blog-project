const {Router} = require('express')
const Sequelize = require('sequelize')
const route = Router()
const {authwire} = require('../../middlewires/auth')
const {createArticle  , createComments , getAllComments } = require('../../controllers/articles')
const {Articles , Comments , Users} = require('../../data/db')

let arr = []

route.get('/:slug/comments'  , async(req,res) => {
    const comment = await getAllComments(req.params.slug)
   
   res.send(comment)
   
   })

route.post('/' , authwire ,  async (req,res) => {
    let a = req.body.article
    const article = await createArticle(
        a.title,
        a.body,
        a.description,
        a.tagList,
        req.user.username,
        false,
        "0" 
    )

    return res.send(article)
})

route.post('/:slug/comments' , authwire , async (req,res) => {

   
  let a = req.body.comment
  
  const comment = await createComments(
      a.body,
     req.user.username,
      req.params.slug
  )
  return res.send(comment)
})


route.delete('/:slug/favourite' , async (req , res) => {
    
    const article = await Articles.findOne({
        where : {slug : req.params.slug},
        include: [{
            attributes: ['username', 'bio', 'image'],
            model: Users,
            as: 'author'
        }]
    })

    article.favourite = false
article.save().then(function() {})

return res.send({
    article 
})

})

route.get('/' , async(req,res) => {
    const article = await Articles.findAll({
        attributes: [
            'slug', 'title', 'description',
            'body', 'createdAt', 'updatedAt',
            'favourite' , 'favouritecount' ,
        ],
        include: [{
            attributes: ['username', 'bio', 'image'],
            model: Users,
            as: 'author'
        }]
    })
    return res.send({
        article ,
       articlecount : article.length
    })
})

  route.put('/:slug' , async (req , res) => {
     let a = req.body.article

    const update = await Articles.findOne({
        attributes: [
            'slug', 'title', 'description',
            'body', 'createdAt', 'updatedAt',
            'favourite' , 'favouritecount'
        ] ,
        where : {slug : req.params.slug},
        include: [{
            attributes: ['username', 'bio', 'image'],
            model: Users,
            as: 'author'
        }]
    })
  
   update.title = a.title
   update.save().then(function () {})

    update.body = a.body
   update.save().then(function () {})

   return res.send({update})
  })

  route.delete('/:slug' , async (req , res) => {
    const article = await Articles.findOne({
        attributes: [
            'slug', 'title', 'description',
            'body', 'createdAt', 'updatedAt',
            'favourite' , 'favouritecount'
        ] ,
        where : {slug : req.params.slug},
        include: [{
            attributes: ['username', 'bio', 'image'],
            model: Users,
            as: 'author'
        }]
    })

    article.destroy()

  })

 route.delete('/:slug/comments/:id' , async(req , res) => {
    const opi = await Comments.findOne({
    where : {
        [Sequelize.Op.and] : [
            {slug: req.params.slug},
            {id : req.params.id}
        ]
    }
 })

    opi.destroy()

return  res.send('deleted')

 })

 route.post('/:slug/favourite' , authwire ,  async(req,res) => {
    const article = await Articles.findOne({
        attributes: [
            'slug', 'title', 'description',
            'body', 'createdAt', 'updatedAt',
            'favourite' , 'favouritecount'
        ] ,
        where : {slug: req.params.slug},
        include: [{
            attributes: ['username', 'bio', 'image'],
            model: Users,
            as: 'author'
        }]
    })
arr.push(req.user.username)
console.log(article)

article.favouriteUsername  =  arr
article.save().then(function() {})

article.favouritecount = arr.length
article.save().then(function() {})

article.favourite = true
article.save().then(function() {})


return res.send({
    article 
})

})




module.exports = {route}