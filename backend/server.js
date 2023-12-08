const express= require('express')
const colors=require('colors')
const { errorHandle } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const dotenv= require('dotenv').config()
const port=process.env.port || 5000


connectDB()

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/goals', require('./routes/goalRoutes'))
 app.use(errorHandle)
app.listen(port,
    ()=>console.log(`serveur lancée au port:${port}`))