const mongoose = require('mongoose')
require('dotenv').config()
const DatabaseConnection =  async ()=>{
    mongoose.connect(process.env.MONGOURL)
    .then((con)=>{
        console.log(`Database has connected${con.connection.host}`)
    })
    .catch((e)=>{
        console.log(` Dtabase donot connect${e}`)
    })
}
module.exports = DatabaseConnection