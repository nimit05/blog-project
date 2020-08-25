const {Users , Articles} = require('../data/db')
const {getrandomstring} = require('../utils/random')

async function createusers (username ,email , password) {
    const user = await Users.create({
        username,
        email,
        password,
        token : getrandomstring(32) , 
    })

    return user
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

module.exports = {createusers  , findUserByToken , findUserByslug}

