const {Router} = require('express')
const route = Router()
const {authwire} = require('../../middlewires/auth')
const {createArticle  , createComments , getAllComments , getAllCommentsfromname} = require('../../controllers/articles')
const {Articles , Comments , Users} = require('../../data/db')
// const session = require('express-session')

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
        "0" ,
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

route.post('/:slug/favourite' , authwire ,  async(req,res) => {


const article = await Articles.findOne({
    where : {slug : req.params.slug},
    include: [{
        attributes: ['username', 'bio', 'image'],
        model: Users,
        as: 'author'
    }]
})



arr.push(req.user.username)
console.log(arr)

article.favouriteUsername = arr


article.favouritecount = arr.length
article.save().then(function() {})

article.favourite = true
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
            'favourite' , 'favouritecount'
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


module.exports = {route}