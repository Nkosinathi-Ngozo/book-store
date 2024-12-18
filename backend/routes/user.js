const router = require('express').Router();
const userController = require('../controllers/user')
const { verifyToken, verifyAdmin } = require('../middleware/auth')

//! UPDATE USER
router.put("/:id", verifyToken, userController.updateUser);

//! DELETE USER
router.delete('/:id', verifyToken, userController.deleteUser);

//! GET USER
router.get('/find/:id', verifyToken, verifyAdmin, userController.getUserById);

//! GET ALL USER
router.get('/', verifyToken, verifyAdmin, userController.getAllUsers);

//! GET USER STATS
router.get('/stats', verifyToken, verifyAdmin, userController.userStats);

module.exports = router;