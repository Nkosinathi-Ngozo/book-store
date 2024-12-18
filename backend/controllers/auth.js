const jwt = require('jsonwebtoken');
const userService = require('../service/user');

const authController = {

    async register(req, res){
        const {
            first_name, 
            last_name,
            username, 
            email, 
            password, 
            phone_number
        } = req.body;

        try {
            const newUser = {
                username: username,
                email: email,
                password: password,
                fullName:  `${first_name} ${last_name}`,
                phoneNumber: phone_number,
            }
            const savedUser = userService.createUser(newUser);
            
            res.status(201).json(savedUser);
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({error})
        }
    }, 

    async login(req, res){
        try {
            const user = userService.getUserByEmail(req.body.email)

            !user && res.status(401).json('Wrong email');

            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC
            );
    
    
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    
            const inputPassword = req.body.password;
            
            originalPassword != inputPassword && 
                res.status(401).json("Wrong Password");
    
            const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
                {expiresIn:"3d"}
            );
      
            const { password, ...others } = user;  
            res.status(200).json({...others, accessToken});
        } catch (error) {
            console.error('Error loging in user:', error);
            res.status(500).json(err);
        }
    }
}

module.exports = authController