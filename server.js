const exp = require('express')
const app = exp()
const {db} = require('./data/db')
const apiroute = require('./routes/api').route
const dotenv = require('dotenv')
dotenv.config();

app.use(exp.json())
app.use('/api' , apiroute)
app.use(exp.urlencoded({extended : true}))


db.sync({}).then( () => {
    app.listen(7878 , ()=> {
        console.log('sever started on http//:localhost:7878')
    })
    
}
    
)
