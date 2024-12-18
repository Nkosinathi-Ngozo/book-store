const productService = require('../service/product');

const productController = {

    async getProductById(req, res){
        const { id } = req.params

        try {
            const product = await productService.getProductById(id)
            res.status(200).json(product);
        } catch (error) {
            console.error('Error getting product:', error);
            res.status(500).json({error})
        }
    },

    async createProduct(req, res){
        const {book_title, book_author, book_year, price, img} = req.body;

        try {
            const newProduct = {
                book_title, 
                book_author, 
                book_year, 
                price, 
                img,
                userId: req.user.id
            }
            const savedProduct = await productService.createProduct(newProduct)
            res.status(200).json(savedProduct);
        } catch (error) {
            console.error('Error getting product:', error);
            res.status(500).json({error})
        }
    },

    async getAllProducts(req, res){

        try {
            const products = await productService.getAllProducts()
            res.status(200).json(products);
        } catch (error) {
            console.error('Error getting products:', error);
            res.status(500).json({error})
        }
    },

    async getUserProducts(req, res){
        const { id } = req.user

        try {
            const products = await productService.getUserProducts(id)
            res.status(200).json(products);
        } catch (error) {
            console.error('Error getting products:', error);
            res.status(500).json({error})
        }
    },

    async updateProduct(req, res){
        const { id } = req.params
        
        try {
            const product = await productService.updateProduct(id, req.body)
            res.status(200).json('Product has been updated...');
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({error})
        }
    },

    async deleteProduct(req, res){
        const { id } = req.params

        try {
            const product = await productService.deleteProduct(id)
            res.status(200).json('Product has been deleted...');
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({error})
        }
    },
}

module.exports = productController