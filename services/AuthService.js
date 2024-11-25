const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');// adds more security
const {User} = require('../models');
const validator = require('validator');
const maxAge = 3 * 24 * 60 * 60;


const register = async (user) =>{
    const {
        first_name, last_name,
        username, 
        email, 
        password, 
        confirm,
        phone_number
    } = user;

    
}

const login = async (req, res) =>{

}