const express = require('express')
const{Home,createAccount,signIn,getUser,logOut} = require('../controller/controller.js')
const jwtAuth = require('../middleware/middleware.js')
const router = express.Router()
router.post('/create',createAccount)
router.post('/signIn',signIn)
router.get('/get',jwtAuth ,getUser )
router.get('/logout',jwtAuth,logOut)
module.exports = router