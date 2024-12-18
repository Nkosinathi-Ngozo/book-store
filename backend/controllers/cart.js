const jwt = require('jsonwebtoken');
const cartService = require('../service/cart');

const cartController = {

    async getCartById(req, res){
        const { id } = req.params

        try {
            const cart = await cartService.getCartById(id)
            res.status(200).json(cart);
        } catch (error) {
            console.error('Error getting cart:', error);
            res.status(500).json({error})
        }
    },

    async createCart(req, res){

        try {
            let newCart = req.body
            newCart.userId = req.user.id
            const savedOrder = await cartService.createCart(newOrder)
            res.status(200).json(savedOrder);
        } catch (error) {
            console.error('Error getting cart:', error);
            res.status(500).json({error})
        }
    },

    async getAllCarts(req, res){

        try {
            const orders = await cartService.getAllCarts()
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error getting carts:', error);
            res.status(500).json({error})
        }
    },

    async getUserCart(req, res){
        const { id } = req.user

        try {
            const cart = await cartService.getUserCart(id)
            res.status(200).json(cart);
        } catch (error) {
            console.error('Error getting cart:', error);
            res.status(500).json({error})
        }
    },

    async updateCart(req, res){
        const { id } = req.params
        
        try {
            const cart = await cartService.updateCart(id, req.body)
            res.status(200).json('Cart has been updated...');
        } catch (error) {
            console.error('Error updating cart:', error);
            res.status(500).json({error})
        }
    },

    async deleteProduct(req, res){
        const { id } = req.params

        try {
            const cart = await cartService.deleteProduct(id)
            res.status(200).json('Cart has been deleted...');
        } catch (error) {
            console.error('Error deleting cart:', error);
            res.status(500).json({error})
        }
    },
}

module.exports = cartController