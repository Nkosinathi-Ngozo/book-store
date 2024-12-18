const orderModel = require('../models/order');

const orderService = {

    async getOrderById(orderId) {
        const order = await orderModel.findById(orderId);

        if (!order) return null;
        return order; // returns user
    },

    async createOrder(orderData) {
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        return newOrder; // returns user
    },

    async updateOrder(orderId, orderData) {
        return await orderModel.findByIdAndUpdate(
            orderId, 
            {
                $set: orderData,
            }, 
            { new: true }); // `new: true` returns the updated document
    }, // returns user

    async deleteOrder(orderId) {
        return await orderModel.findByIdAndDelete(orderId);
    }, // returns user

    
    async getUserOrders(userId) {
        return await orderModel.find({ userId });;
    }, // returns [] of carts

    async getAllOrders() {
        return await orderModel.find();
    }, // returns [] of users

    async getMonthlyIncome(){
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

        
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                month: { $month: "$createdAt" },
                sales: "$price",
                },
            },
            {
                $group: {
                _id: "$month",
                total: { $sum: "$sales" },
                },
            },
        ]);

        return income
    }
};

module.exports = orderService;
