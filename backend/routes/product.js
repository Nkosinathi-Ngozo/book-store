const router = require('express').Router();
const productController = require('../controllers/product')
const { verifyToken, verifyAdmin } = require('../middleware/auth')

//! GET PRODUCT BY ID
router.get("/find/:id", verifyToken, productController.getProductById);

//! CREATE NEW PRODUCT
router.post('/', verifyToken, productController.createProduct);

//! GET ALL CARTS
router.get('/', verifyToken, verifyAdmin, productController.getAllProducts);

//! GET USER PRODUCT
router.get("/:id", verifyToken, productController.getUserProducts);

//! UPDATE PRODUCT
router.put("/:id", verifyToken, productController.updateProduct);

//! DELETE PRODUCT
router.delete("/:id", verifyToken, productController.deleteProduct);

module.exports = router;