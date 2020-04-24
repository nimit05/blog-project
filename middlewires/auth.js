const {findUserByToken} = require('../controllers/users')

async function authwire(req , res , next){
    let auth = req.headers['authorization']
    if (auth && auth.startsWith('Token ')) {
        let token = auth.split(' ')[1]
        let user = await findUserByToken(token)
        if (user) {
            req.user = user 
            
            return next()
        }
    } else {
        res.status(401).send({
            "errors":{
              "body": [
                "Authorization Token empty"
              ]
            }
          })
    }
}
module.exports = {authwire}   
