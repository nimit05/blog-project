const Sequelize = require('sequelize')
const dotenv = require('dotenv')
dotenv.config();


const db = new Sequelize({
    dialect : 'mysql' ,
    database : 'realworldio',
    username : 'creator',
    password : 'letmein'
})

const Users = db.define('users' , {
 
    username : {
        type : Sequelize.STRING(50),
        primaryKey : true
    },
    email : {
        type : Sequelize.STRING(100),
        allownull : false
    },
    password : {
        type : Sequelize.STRING(32),
        allownull : false
    },
    token :{
        type : Sequelize.STRING(45),
        allownull : false
    }
}

)

const Articles = db.define('articles' ,  {
    "slug": {
        type: Sequelize.STRING(100),
        primaryKey: true
    },
    "title": {
        type: Sequelize.STRING,
        allowNull: false,
    },
    "description": {
        type: Sequelize.STRING
    },
    "body": {
        type: Sequelize.TEXT
    },
   "tagList" : {
       type : Sequelize.TEXT
   },
   "favourite" : {
       type : Sequelize.BOOLEAN
   },
   'favouritecount' : {
       type : Sequelize.INTEGER
   },
   "favouriteUsername" : {
       type : Sequelize.TEXT
   }
}


)

Articles.belongsTo(Users , {as : 'author'})
Users.hasMany(Articles , {as : 'author'})

const Comments = db.define('comments' , {
    "id" : {
        type : Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
     
    },
    "body" : {
        type : Sequelize.TEXT,
        allowNull : false
    },
    "slug": {
        type: Sequelize.STRING(100)
    }

})


Users.hasMany(Comments , {as : 'user'})
Comments.belongsTo(Users , {as : 'user'})

module.exports = {
    db,
    Users,
    Articles,
    Comments,
    
}