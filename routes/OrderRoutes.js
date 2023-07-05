const router = require('express').Router();
const {User, Order} = require('../models');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');
const db = require('../models');

//!CREATE
router.post('/', verifyTokenAndAuthorization, async (req, res)=>{

    User.hasMany(Products,
         {
            as: 'products', 
         foreignKey: 'userId'
        });
    
    const newOrder = new Order(req.body, {userId: User.id});

    
    try{
        const savedOrder = await newOrder.save();

        return res.status(200).json(savedOrder);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

//!UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req,res) => {
    
    try{
        const Id = req.params.id;//id in url
        
        const UpdatedOrder = await Cart.update(req.body,{
            where: {Id},//checls for same id in database
        });

        const updatedOrderReport = await Order.findOne({
            where: {Id}
        });
        const{id, createdAt, updatedAt,
            ...others} = updatedOrderReport.dataValues;

        console.log({...others});

        res.status(200).json({...others});// returns data updated

        console.log('user info updated');

       // console.log({...others});
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});


//! DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) =>{
    const id = req.params.id;
    try{
        const cartToDelete = await Cart.findOne({
            where: {id},
        });// find user to delete through id

        await cartToDelete.destroy();// deletion of user

        return res.status(200).json("Cart Deleted...");
    }catch(err){
        console.log(err);
        return res.status(500).json("An error occured");

    }
});


//!GET USER ORDERS
router.get('/find/userId', verifyTokenAndAuthorization, async (req,res) => {
    const id = req.params.id;
    try{
        const orders = Order.findAll({
            where: {userId: req.params.userId}
        });

        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});

//! GET All ORDERS
router.get('/', verifyTokenAndAdmin, async (req,res) =>{
    try{

        const orders = await Order.findAll();

        res.status(200).json(orders);

    }catch(err){
        res.status(200).json(err);
    }
});


//!GET MONTHLY INCOME
router.get('/income', verifyTokenAndAdmin, async (req, res) =>{
    
    const date = new Date(); 
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth()-1));
            
    try{

        const income = await User.count({
            model: Order,
            where:{
                createdAt: db.sequelize.where(
                    db.sequelize.fn('MONTH', db.sequelize.col('createdAt')), previousMonth 
                ),
            },
            attributes:[
                [db.sequelize.fn('Month', db.sequelize.col('createdAt')), 'month'],
                [db.sequelize.fn('SUM', db.sequelize.col('amount')), 'total sales'],
            ],   
            group:['month', 'amount'],  
        });
        
        res.status(200).json(income);
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;