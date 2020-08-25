const {Users} = require('../data/db')
async function authwire(req , res , next){
        let token = null
        let authUser = null
        
        if(req.session){
            token = req.session.token
        }
        if(token){
             authUser = await Users.findOne({
                where : {
                    token : token
                }
            })
        }
        if(authUser){
            req.user = authUser;
            next();
        }else{
            res.send({error : 'Authorization error'})
        }
    }

module.exports = {authwire}   
