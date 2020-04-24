const {Users , Articles} = require('../data/db')
const {getrandomstring} = require('../utils/random')

async function createusers (username ,email , password  , bio , image , following) {
    const newuser = await Users.create({
        username,
        email,
        password,
        token : getrandomstring(32) , 
        bio,
        image,
        following
    })


    const user = await Users.findOne({
        attributes : ['username' , 'bio' , 'image' , 'token', 'createdAt'
    , 'updatedAt' , 'email']
    })

    return user
}

async function authuser(username , password) {
    const auth = await Users.findOne({
        where : {username}
    })
    if(!auth){
        return { body: [ 'No user found with that username' ]}
    }
    if(auth.password != password){
        return {body : ['incorrect Password']}
    }
    else{
        return auth
    }
}

async function findUserByToken(token) {
    const user = await Users.findOne({
        where: { token }
    })

    if (!user) {
        return { body: [ 'Invalid token' ]}
    }

    return user
}

async function findUserByslug(slug) {
    const article = await Articles.findOne({
        where: { slug },
       
    })

    if (!article) {
        return { body: [ 'Invalid slug' ]}
    }
    


    return article.authorUsername

}

module.exports = {createusers , authuser , findUserByToken , findUserByslug}

