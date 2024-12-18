const cartModel = require('../models/cart');

const cartService = {

    async getCartById(cartId) {
        const cart = await cartModel.findById(cartId);

        if (!cart) return null;
        return cart; // returns user
    },

    async createCart(cartData) {
        const newCart = new cartModel(cartData);
        await newCart.save();

        return newCart; // returns user
    },

    async updateOrder(cartId, cartData) {
        return await cartModel.findByIdAndUpdate(
            cartId, 
            {
                $set: cartData,
            }, 
            { new: true }); // `new: true` returns the updated document
    }, // returns user

    async deleteCart(cartId) {
        return await cartModel.findByIdAndDelete(cartId);
    }, // returns user

    async getUserCart(userId) {
        return await cartModel.findOne({ userId });;
    }, // returns [] of carts

    async getAllCarts() {
        return await cartModel.find();
    }, // returns [] of carts

};

module.exports = cartService;
