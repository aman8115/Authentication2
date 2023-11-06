const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')

const DBconnection = require('./config/config.js')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())


DBconnection()
const routers = require('./router/router.js')
app.use('/',routers)
module.exports = app;