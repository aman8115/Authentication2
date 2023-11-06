const e = require('express');
const User = require('../model/schema.js')
const emailvalidator = require('email-validator')

const bcrypt = require('bcrypt')
const createAccount = async (req,res)=>{
    const{name,email,mobileNumber,password} = req.body;
    if(!name||!email||!mobileNumber||!password){
        return res.status(400).json({
            success:false,
            message:" All field is requird "
        })
    }
    const valid_email = emailvalidator.validate(email)
    if(!valid_email){
        return res.status(400).json({
            success:false,
            message:" Enter a valid email"
        })
    }
    
    try{
        const userData = new User(req.body)
        const userInfo =  await userData.save()
        res.status(200).json({
            success:true,
            message:" your account created successfully",
            userInfo
        })
    }catch(e){
        console.log(e)
        if(e.code === 11000){
            res.status(401).json({
                success:false,
                message:" you are already rgisterd with this email"
            })
        }
        res.status(400).json({
            success:false,
            message:` your account could not create ${e.message}`
            
        })
    }


}
const signIn =  async (req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        return res.sttatus(401).json({
            success:false,
            message:" both field is required "
        })
    }
   try {
    const user = await  User.findOne({email}).select('+password')
    if(!user||!( await bcrypt.compare(password,user.password))){
        return res.status(401).json({
            success:false,
            message:" you password is incorrect"
        })
    }
    const token = user.jwtToken()
    user.password = undefined
    const cookieOption = {
        maxAge:24*60*60*1000,
        httpOnly:true,
    }
    res.cookie('token',token,cookieOption)
    res.status(200).json({
        success:true,
        message:" you login successfully",
        user
    })
   } catch (error) {
    return res.status(401).json({
        success:false,
        message:` you not logdIn successfully${error}`
    })
    
   }
}
const getUser = async (req,res)=>{
    const userId = req.user.id
    try{
        const userdata = await User.findById(userId)
        res.status(200).json({
            success:true,
            message:" your infomation  print successfully",
            information:userdata
        })

    }catch(e){
        return res.status(401).json({
            success:false,
            messahe:` you information donot available in database${e}`
        })

    }
}
const logOut = (req,res)=>{
    try {
        const cookieOption = {
            expires: new Date(),
            httpOnly:true
        }
        res.cookie('token',null,cookieOption);
        res.status(200).json({
            success:true,
            message:" logout"
        })
    } catch (error) {
        res.status({
            success:false,
            message:` you donot logout ${error}`
        })
        
    }
}

const Home = (req,res)=>{
    res.status(200).json({
        success:true,
        message:" express server"
    })

}
module.exports = {
    createAccount,
    Home,
    signIn,
    getUser,
    logOut
}