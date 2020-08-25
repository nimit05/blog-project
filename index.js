const exp = require('express')
const app = exp()
const {db} = require('./data/db')
const apiroute = require('./routes/api').route
const session = require("express-session");
const dotenv = require('dotenv')
dotenv.config();

app.use(
    session({
      secret: process.env.session_sec,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: false,
      }
    })
  );

app.use(exp.json())
app.use('/api' , apiroute)
app.use(exp.urlencoded({extended : true}))


db.sync().then( () => {
    app.listen(7878 , ()=> {
        console.log('sever started on http//:localhost:7878')
    })
    
}
    
)
