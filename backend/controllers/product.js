const productService = require('../service/product');
const cloudinary = require('../config/cloudinaryConfig');
const { unlink } = require('fs').promises;

const productController = {

    async getProductById(req, res){
        const { id } = req.params

        try {
            const product = await productService.getProductById(id)
            res.status(200).json({ product, success: true });
        } catch (error) {
            console.error('Error getting product:', error);
            res.status(500).json({error})
        }
    },

    async createProduct(req, res) {
        const { book_title, book_author, book_year, price } = req.body;
        const img = req.file; // The uploaded image

        try {
            if (img) {
                // Log file details (optional)
                console.log(`File Type: ${img.mimetype}`);

                // Upload the image to Cloudinary directly from the buffer
                const uploadResult = await cloudinary.uploader.upload(img.path, {
                    folder: 'products',  // Optional folder structure
                    resource_type: 'auto',  // Automatically detect file type
                });
    
                const newProduct = {
                    book_title,
                    book_author,
                    book_year,
                    price,
                    img: uploadResult.secure_url, // Use the Cloudinary URL
                    userId: req.user.id,  // Assuming user is authenticated
                };

                // Save the product to the database (assuming productService is set up)
                const savedProduct = await productService.createProduct(newProduct);

                console.log('Product saved successfully');
                // Send success response
                await unlink(img.path);
                res.status(200).json({ savedProduct, success: true });
            } else {
                console.log('Image is required');
                res.status(400).json({ error: 'Image is required' });
            }
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ message: 'Failed to create product' });
        }
    },

    async getAllProducts(req, res){

        try {
            const products = await productService.getAllProducts()
            console.log(`products: ${products}`)
            res.status(200).json({products, success: true});
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