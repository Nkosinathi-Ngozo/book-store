const router = require('express').Router();
const cartController = require('../controllers/cart')
const {  verifyToken, verifyAdmin } = require('../middleware/auth')

//! GET CART BY ID
router.get("/find/:id", verifyToken, cartController.getCartById);

//! CREATE NEW CART
router.post('/', verifyToken, cartController.createCart);

//! GET ALL CARTS
router.get('/', verifyToken, verifyAdmin, cartController.getAllCarts);

//! GET USER CART
router.get("/:id", verifyToken, cartController.getUserCart);

//! UPDATE CART
router.put("/:id", verifyToken, cartController.updateCart);

//! DELETE CART
router.delete("/:id", verifyToken, cartController.deleteProduct);

module.exports = router;