const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'user' // Referencing the 'User' model
    },
    book_title: {
        type: String, 
        required: true,
        trim: true,
        match: [/^[A-Za-z0-9\s]+$/, 'Book title can only contain letters, digits and spaces'] 
    },
    book_author: {
        type: String, 
        required: true,
        trim: true,
        match: [/^[A-Za-z0-9\s]+$/, 'Book author can only contain letters, digits and spaces'] 
    },
    book_year: {
        type: String,
        required: true,
        match: [/^\d{4}$/, 'Book year must be a 4-digit number'] // Validates a 4-digit year
    },
    img: {
        type: String,
        required: true,
        trim: true // Ensures no leading or trailing spaces
    },
    price: {
        type: Number, 
        required: true,
        min: [0, 'Price must be a positive number'] // Clear error message
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true // Prevents updates to this field
    }
});

module.exports = mongoose.model('Product', productSchema);
