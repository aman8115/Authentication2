const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const userdataModel = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required'],
        trim:true,

    },
    email:{
        type:String,
        required:[true,"email is required"],
        trim:true,
    },
    mobileNumber:{
        type:Number,
        required:[true,"mobileNumber is required"],
        trim:true
    },
    password:{
        type:String,
        require:[true,'password is required'],
        trim:true,
        select:false
    }

})
userdataModel.pre('save', async function(next){
    if(!this.isModified('password')){
        return  next()
    }
    this.password = await bcrypt.hashSync(this.password,10)
    return next()
})
userdataModel.methods = {
    jwtToken(){
      return  jwt.sign({id:this.id,email:this.email},process.env.SECRET,{expiresIn:'24h'})
    }
    
    
}
module.exports = mongoose.model('User',userdataModel)