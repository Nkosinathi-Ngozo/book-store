const express = require('express')
const app = express() 
const config = require('dotenv').config()
const path = require('path')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const { connectDB } = require('./config/mongoConfig')
const urlprefix = '/api'

 
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const productRoute = require('./routes/product');


connectDB()


app.use(cors())
app.use(express.json())   


app.use(`${urlprefix}/auth`, authRoute)
app.use(`${urlprefix}/user`, userRoute)
app.use(`${urlprefix}/cart`, cartRoute)
app.use(`${urlprefix}/order`, orderRoute)
app.use(`${urlprefix}/product`, productRoute)


app.listen(PORT, () =>{
    console.log(`Server has started at port ${PORT}`)
}) 