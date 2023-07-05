const router = require('express').Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');// adds more security
const {User} = require('../models');
const validator = require('validator');
const passport = require('passport');
const url = require('url');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const maxAge = 3 * 24 * 60 * 60;
//const maxAge = 5 * 60;


//! REGISTER
router.post("/register", async(req, res) =>{
    const {
        first_name, last_name,
        username, 
        email, 
        password, 
        confirm,
        phone_number
    } = req.body;

    console.log( first_name, last_name, 
    username, 
    email, 
    password, 
    confirm,
    phone_number);
    
    const validationError = [];
    try{

        if(validator.isEmpty(first_name)){
            validationError.push(errorMessage('First name'));
            console.log(errorMessage('First name'));
        }
        if(validator.isEmpty(last_name)){
            validationError.push(errorMessage('Last name'));
            console.log(errorMessage('Last name'))
        }
        if(validator.isEmpty(username)){
            validationError.push(errorMessage('Username'));
            console.log(errorMessage('Username'));
        }
        if(validator.isEmpty(email)){
            validationError.push(errorMessage('Email'));
            console.log(errorMessage('Password'));
        }
        else if(!validator.isEmail(email)){
            validationError.push('Enter a valid email');
        }
        if(validator.isEmpty(password)){
            validationError.push(errorMessage('Password'));
        }
        if(!validator.isMobilePhone(phone_number) || phone_number.length !== 10 ||
            phone_number[0] !== '0'){
                validationError.push('Enter a valid SA number');
        }
        
        if(validator.isEmpty(confirm)){
            validationError.push(errorMessage('Confirm password'));
            console.log(errorMessage('Confirm password'))
        }else if(password !== confirm){
            validationError.push('confirm password does not match password')
        }

        const existingEmail = await User.findOne({
            where: {email}
        });


        const existingUserName = await User.findOne({
            where: {username}
        });

        if(existingEmail){
            validationError.push('Email already exists');
        }
        else if(existingUserName){
            validationError.push('Username already exists');
        }

        if(validationError.length){
            for(let i = 0; i < validationError.length; i++){
                console.log(validationError[i], 'hh');
                //res.status(200).json(validationError[i]);
            }
            const message = req.flash("message", validationError);
            
            return res.redirect('/Sign-up');
        }
        

        console.log(existingUserName, existingEmail);
        if(!existingEmail && !existingUserName){
            const full_name = first_name + ' ' + last_name;
            console.log(full_name, 'name')
            const encryptedPassword= CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
    
            const user = await User.create({
                full_name, 
                username, 
                email, 
                password: encryptedPassword, 
                phone_number
            });// .create used store user info that is placed in a list
            
            const accessToken = jwt.sign(
                {
                    id: user.uuid, 
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SEC,
                {expiresIn: "3d"}
            );// authorization token

            //authorization cookie
            res.cookie('jwt', 
            accessToken, 
            {
                httpOnly: true, 
                maxAge: maxAge * 1000
            });

            //res.redirect('/announcements');
            console.log('user added');
            return res.redirect('/home');
        }
        else{
            console.log('User account already exists login')
        }

        
    }catch(err){
        console.log(err);
        //return res.status(500).json(err);
    }   
});

//! LOGIN
router.post('/login', async (req, res) => {
    const email = req.body.email;// login through email
    const validationError = [];

    try{
        if(validator.isEmpty(email)){
            validationError.push(errorMessage('Email'));
            console.log(errorMessage('Email'));
        }
        if(validator.isEmpty(req.body.password)){
            validationError.push(errorMessage('Password'));
            console.log(errorMessage('Password'));
        }

        for(let i = 0; i< validationError.length; i++){
            console.log(validationError[i]);
        } 
        
        if(validationError.length){
            return console.log(errorMessage('Password, Email1'))
        }

        
        const user = await User.findOne({
            where: {email},// finds email
        });
        
        if(!user) {
            console.log('user email not found');
            return validationError.push('user email not found');// if email entered is wrong returns message
        }
        const hashedPassword =  CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SEC
        );
        
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        
        if(OriginalPassword !== req.body.password){
            console.log(OriginalPassword, req.body.password);
            console.log('password does not match email');
            return validationError.push('password does not match email');
        }//! if entered password does not match password of the email found returns message

            const accessToken = jwt.sign(
                {
                    id: user.uuid, 
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SEC,
                {expiresIn: "3d"}
            );//!jwt web token

        const {password, ...others} = user.dataValues;
        //! seperation of the data in the user dataValues into password and others to therefore be returned without password
        
        //res.redirect('/announcements');
        res.cookie('jwt', 
            accessToken, 
            {
                httpOnly: true, 
                maxAge: maxAge * 1000
            });
        //res.status(200).json({...others, accessToken});
        console.log(maxAge);
        // res.redirect('back');
        //return res.redirect('back');    
        
            // let previousUrl = req.headers.referer;
            // console.log(previousUrl, 'dsxza');
            // if (!previousUrl) {
            //   // if the previous URL is not available, redirect to the homepage
            //   res.redirect('/');
            //   console.log('ola');
            // } else {
            //   // redirect the user back to the URL two pages back
            //   let redirectUrl = previousUrl;
            //   let previousPathname = url.parse(previousUrl).pathname;
            //   if (previousPathname !== '/') {
            //     redirectUrl = previousUrl.replace(previousPathname, '');
            //   }
            //   res.redirect(redirectUrl);
            //   console.log(redirectUrl);
              //console.log();
            // }

            res.redirect('/home');
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});


router.get('/logout', (req, res) =>{
    res.cookie('jwt', '', {
        maxAge: 1
    });

    // if(req.user.isAdmin){
    //     req.user.isAdmin = false;
    // }
    res.redirect('/');
});


const errorMessage = (errLocation) =>{
    return errLocation + ' cannot be empty/blank'
}


module.exports = router;