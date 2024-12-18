const productModel = require('../models/product');

const productService = {

    async getProductById(productId) {
        const product = await productModel.findById(productId);

        if (!product) return null;
        return product; // returns user
    },

    async createProduct(productData) {
        const newProduct = new productModel(productData);
        await newProduct.save();

        return newProduct; // returns user
    },

    async updateProduct(productId, produtData) {
        return await productModel.findByIdAndUpdate(
            productId, 
            {
                $set: produtData,
            }, 
            { new: true }); // `new: true` returns the updated document
    }, // returns user

    async deleteProduct(productId) {
        return await productModel.findByIdAndDelete(productId);
    }, // returns user

    async getUserProducts(userId) {
        return await productModel.find({ userId });;
    }, // returns [] of carts

    async getAllProducts() {
        return await productModel.find();
    }, // returns [] of users

};

module.exports = productService;
