"use strict";
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {// !our info
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS
    }
});


const recieptEmail = (email_reciever) =>{
    
    const message ={//! reciept mail
        from: process.env.USER_EMAIL,
        to: email_reciever,
        subject: '',
        text: '',
        //html
    }
    
    transporter.sendMail(mailOptions, (err, info) =>{
        if(err){
            console.log(err);
        }else{
            console.log('Email sent: ' + info.response);
        }
    });
}


const emailVerification =  (email_reciever) =>{

    const mailOptions ={//! reciept mail
        from: process.env.USER_EMAIL,
        to: email_reciever,
        subject: '',
        text: '',
        //html
    }
    
    transporter.sendMail(mailOptions, (err, info) =>{
        if(err){
            console.log(err);
        }else{
            console.log('Email sent: ' + info.response);
        }
    });
}

const forgotPassword = () =>{

}

module.exports = {recieptEmail, emailVerification};