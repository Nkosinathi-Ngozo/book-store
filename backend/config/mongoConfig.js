const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI

const connectDB = async () =>{
    // This method was adapted from dev
    // https://dev.to/alexmercedcoder/basic-authentication-with-node-express-and-mongo-1a1c#:~:text=This%20article%20is%20a%20walkthrough%20to%20creating%20a%20basic%20level
    // https://dev.to/alexmercedcoder
    // Alex Merced
    try {
        await mongoose.connect(MONGO_URI);
        console.log('mongoDB is CONNECTED!!! :)')
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

module.exports = { connectDB }