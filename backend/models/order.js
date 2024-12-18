const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'user' // Referencing the 'User' model
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true // Prevents updates to this field
    }
});

module.exports = mongoose.model('Order', orderSchema);
