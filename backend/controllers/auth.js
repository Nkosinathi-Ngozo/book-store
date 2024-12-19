const jwt = require('jsonwebtoken');
const userService = require('../service/user');
const maxAge = 3 * 24 * 60 * 60;
const CryptoJS = require('crypto-js')



const authController = {

    async register(req, res){
        console.log('Register');
  
        const {
            first_name, 
            last_name,
            username, 
            email, 
            password, 
            phone_number
        } = req.body;

        try {
            const encryptedPassword= CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();

            const newUser = {
                username: username,
                email: email,
                password: encryptedPassword,
                fullName:  `${first_name} ${last_name}`,
                phoneNumber: phone_number,
            }
            const savedUser = await userService.createUser(newUser);
            
            const user = savedUser._doc

            const accessToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SEC,
                {expiresIn:"3d"}
            );

            console.log(`_id: ${user._id}\nisAdmin: ${user.isAdmin}`)

            //authorization cookie
            res.cookie('jwt', 
                accessToken, 
                {
                    httpOnly: true, 
                    maxAge: maxAge * 1000
                }
            );
            
            console.log('User registered successfully');

            res.status(201).json({user, accessToken, success: true});
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({error})
        }
    }, 

    async login(req, res){
        try {
            const retrievedUser = await userService.getUserByEmail(req.body.email)
 
            console.log(JSON.stringify(retrievedUser._doc))
            !retrievedUser && res.status(401).json('Wrong email');
            
            const user = retrievedUser._doc
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

            //authorization cookie
            res.cookie('jwt', 
                accessToken, 
                {
                    httpOnly: true, 
                    maxAge: maxAge * 1000
                }
            );

            console.log(`_id: ${user._id}\nisAdmin: ${user.isAdmin}`)

            console.log('User logged in successfully');


            res.status(200).json({...others, accessToken, success: true});
        } catch (error) {
            console.error('Error loging in user:', error);
            res.status(500).json(error);
        }
    },

    async logout(req, res){
        res.cookie('jwt', '', {
            maxAge: 1
        });
    },

    async protected(req, res){
        res.json({ isAuthenticated: true, user: req.user });
    }
}

module.exports = authController