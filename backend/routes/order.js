const router = require('express').Router();
const orderController = require('../controllers/order')
const { verifyToken, verifyAdmin } = require('../middleware/auth')

//! GET ORDER BY ID
router.get("/find/:id",  orderController.getOrderById);

//! CREATE NEW ORDER
router.post('/', verifyToken, orderController.createOrder);

//! GET ALL ORDERS
router.get('/', verifyToken, verifyAdmin, orderController.getAllOrders);

//! GET USER ORDER
router.get("/find/:id", verifyToken, orderController.getUserOrders);

//! UPDATE ORDER
router.put("/:id", verifyToken, orderController.updateOrder);

//! DELETE ORDER
router.delete("/:id", verifyToken, orderController.deleteOrder);

//! ORDER STATS
router.delete("/:id", verifyToken, verifyAdmin, orderController.getMonthlyIncome);

module.exports = router;