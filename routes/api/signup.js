const {Router} = require('express')
const route = Router()
const {createusers} = require('../../controllers/users')

route.post('/' , async (req,res) => {
    
        let u = req.body
        const user = await createusers(
            u.username,
            u.email,
            u.password,
        )

        if(user){
            req.session.token = user.token;
            req.session.save();
        }
        console.log(req.session)
            res.send(user)
        
})

module.exports = {route}