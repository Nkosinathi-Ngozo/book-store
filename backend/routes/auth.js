const router = require('express').Router();
const authController = require('../controllers/auth')

//! REGISTER
router.post("/register", authController.register);

//! LOGIN
router.post('/login', authController.login);

//! LOGOUT 
//router.get('/logout', authController.logout);

module.exports = router;