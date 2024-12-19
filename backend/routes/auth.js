const router = require('express').Router();
const authController = require('../controllers/auth')
const {  verifyToken } = require('../middleware/auth')


//! REGISTER
router.post("/register", authController.register);

//! LOGIN
router.post('/login', authController.login);

//! LOGOUT 
router.get('/logout', authController.logout);

//! LOGOUT 
router.get('/protected', verifyToken, authController.protected);

module.exports = router;