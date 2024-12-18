const jwt = require('jsonwebtoken');
const orderService = require('../service/order');

const orderController = {

    async getOrderById(req, res){
        const { id } = req.params

        try {
            const order = await orderService.getOrderById(id)
            res.status(200).json(order);
        } catch (error) {
            console.error('Error getting order:', error);
            res.status(500).json({error})
        }
    },

    async createOrder(req, res){

        try {
            let newOrder = req.body
            newOrder.userId = req.user.id
            const savedOrder = await orderService.createOrder(newOrder)
            res.status(200).json(savedOrder);
        } catch (error) {
            console.error('Error getting order:', error);
            res.status(500).json({error})
        }
    },

    async getAllOrders(req, res){

        try {
            const orders = await orderService.getAllOrders()
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error getting orders:', error);
            res.status(500).json({error})
        }
    },

    async getUserOrders(req, res){
        const { id } = req.user

        try {
            const products = await orderService.getAllOrders(id)
            res.status(200).json(products);
        } catch (error) {
            console.error('Error getting orders:', error);
            res.status(500).json({error})
        }
    },

    async updateOrder(req, res){
        const { id } = req.params
        
        try {
            const order = await orderService.updateOrder(id, req.body)
            res.status(200).json('Order has been updated...');
        } catch (error) {
            console.error('Error updating orders:', error);
            res.status(500).json({error})
        }
    },

    async deleteOrder(req, res){
        const { id } = req.params

        try {
            const order = await orderService.deleteOrder(id)
            res.status(200).json('Order has been deleted...');
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({error})
        }
    },

    async getMonthlyIncome(req, res){
        try {
            const orderData = await orderService.getMonthlyIncome()
            res.status(200).json(orderData);
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({error})
        }
    }
}

module.exports = orderController