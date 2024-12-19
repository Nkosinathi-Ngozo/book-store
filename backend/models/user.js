// This file/schema was adapted from mongoose
// https://mongoosejs.com/docs/guide.html#:~:text=Everything%20in%20Mongoose%20starts%20with%20a%20Schema.%20Each%20schema%20maps

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({ 
    fullName: {
        type: String,
        required: true,
        match: [/^[A-Za-z\s]+$/, 'Full name can only contain letters and spaces'] 
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/, 'Email is not valid']
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        match: [/^0\d{9}$/, 'Phone number must be a valid 10-digit South African number starting with 0'] 
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
})

module.exports = mongoose.model('User', userSchema) 