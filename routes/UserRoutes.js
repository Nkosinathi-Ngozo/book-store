const {User, } = require('../models');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');
const db = require('../models');
const CryptoJS = require('crypto-js');

const router = require('express').Router();


//! UPDATE
router.put('/:uuid', verifyTokenAndAuthorization, async (req,res) => {

    if(req.body.user_password){
        req.body.user_password = CryptoJS.AES.encrypt(
            req.body.user_password, 
            process.env.PASS_SEC
            ).toString();
    }

    try{
        const Id = req.params.uuid;//id in url
        
        const user = await User.update(req.body,{
            where: {Id},//checks for same id in database
        });


        const returnUpdatedInfo = await User.findOne({
            where: {Id},
        });


        const {id,user_password, isAdmin, 
            createdAt, updatedAt, ...others
        } = returnUpdatedInfo.dataValues;

        res.status(200).json(returnUpdatedInfo);// returns data updated

        console.log('user info updated');

        console.log({...others});
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});


//! DELETE
router.delete('/:uuid', verifyTokenAndAuthorization, async (req, res) =>{
    const id = req.params.uuid;
    try{
        const user = await User.findOne({
            where: {id},
        });// find user to delete through id

        await user.destroy();// deletion of user

        return res.status(200).json("User Deleted...");
    }catch(err){
        console.log(err);
        return res.status(500).json("An error occured");

    }
});


//!GET USER

router.get('/find/:uuid', verifyTokenAndAdmin, async (req,res) => {
    const id = req.params.uuid;
    try{
        const user = await User.findOne({
            where: {id}
        });
        
        const {user_password, ...other} = user.dataValues;
        console.log(other);
        
        res.status(200).json(other);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//! GET All USERS
router.get('/', verifyTokenAndAdmin, async (req,res) =>{
    const query = req.query.new;
    try{
        const users = query 
        ? await User.findAll({
            limit: 5,
            order: [
                ['id', 'DESC'],
            ],})

        : await User.findAll();
        
        return res.status(200).json(users);
    }catch(err){
        console.log(err);
        return res.status(500).json("An error occured");
    }
});

//!GET USER STATS
router.get('/stats', verifyTokenAndAdmin, 
    async (req, res) =>{
       const date = new Date(); 
       const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
       const Year = new Date().getFullYear();
       const Month = new Date().getMonth();
       console.log(Month);
       
       try{

            const data = await User.count({
                model: User,
                where:{
                    createdAt: db.sequelize.where(
                        db.sequelize.fn('YEAR', db.sequelize.col('createdAt')), Year 
                    ),
                },
                attributes:[
                    [db.sequelize.fn('Month', db.sequelize.col('createdAt')), 'month'],
                ],   
                group:['month'],  
            });
            
            res.status(200).json(data);
       } catch(err){
            console.log(err);
            return res.status(500).json(err);
       }
});


module.exports = router;