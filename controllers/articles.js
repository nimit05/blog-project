const {Articles , Users , Comments} = require('../data/db')
const {slugify} = require('../utils/string')

async function getAllComments(slug){
  const comment =  await Comments.findAll({
    attributes : [
        'body' , 'createdAt' , 'updatedAt' ,'id' 
    ],
      where  : {slug},
      include : [{
        attributes : ['username' , 'bio' , 'image' ],
        model : Users,
        as : 'user'
    }]
  })
  return ({comment})
}


async function createComments(body , userUsername , slug){
    if (!body) {
        return new Error('body missing')
    }
   const newcomment = await Comments.create({
       body,
       userUsername,
       slug  
   })
   
const opi = await Comments.findOne({
    attributes : [
        'body' , 'createdAt' , 'updatedAt' ,'id' 
    ],
    where :{slug},
    include : [{
        attributes : ['username' , 'bio' , 'image' ],
        model : Users,
        as : 'user'
    }]
   
})

return opi
}


async function createArticle(title , description , body , tagList , authorUsername){
     if (!title) {
        return new Error('title missing')
    }
    if (!body) {
        return new Error('body missing')
    }

    const newArticle = await Articles.create({
        slug: slugify(title),
        title,
        description,
        body,
        tagList,
        authorUsername
    })
    const article = await Articles.findOne({
        attributes: [
            'slug', 'title', 'description',
            'body', 'createdAt', 'updatedAt',
            'favourite' , 'favouritecount' , 'tagList' 
        ],
        where: {slug: newArticle.slug},
        include: [{
            attributes: ['username'],
            model: Users,
            as: 'author'
        }]
    })
    return article
}

module.exports = {
    getAllComments,
    createArticle,
    createComments,
    

}