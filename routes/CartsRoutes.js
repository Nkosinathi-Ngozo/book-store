const router = require('express').Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');
const {Products, Carts, User} = require('../models');

//!CREATE
router.post('/:uuid/:id', verifyTokenAndAuthorization, async (req, res)=>{    

    const uuid = req.params.id;
    console.log(uuid);
    

    try{
        const product = await Products.findOne({
            where: {uuid}
        });
        console.log(product);

        const {book_title, book_author, book_year, price, img} = product;


        const newCart = new Carts({
            userId: product.userId,
            products: {
                book_title, 
                book_author,
                book_year, 
                img,
                price,
            }
        });
        const savedCart = await newCart.save();
        
        return res.status(200).json(savedCart.products);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

//!UPDATE
router.put('/:uuid/:id', verifyTokenAndAuthorization, async (req, res) => {
    
    try{
        const uuid = req.params.id;//id in url
        
        const UpdatedCart = await Carts.update(req.body,{
            where: {uuid},
        });

        const updatedCartReport = await Carts.findOne({
            where: {uuid}
        });


        const{id, createdAt, updatedAt,
            ...others} = updatedCartReport.dataValues;

        console.log({...others});
        
        console.log('user info updated');

        res.status(200).json({...others});// returns data updated

    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});


//! DELETE
router.delete('/:id/:uuid', verifyTokenAndAuthorization, async (req, res) =>{
    const uuid = req.params.id;
    try{
        const cartToDelete = await Carts.findOne({
            where: {uuid},
        });// find user to delete through id

        await cartToDelete.destroy();// deletion of user

        return res.status(200).json("Cart Deleted...");
    }catch(err){
        console.log(err);
        return res.status(500).json("An error occured");

    }
});


//!GET All CART FROM A SPECIFIC USER
router.get('/:id', verifyTokenAndAuthorization, async (req,res) => {
    const uuid = req.params.id;
    try{
        
        const user = await User.findAll({
            where: {uuid},
            include: 'carts'
        });

        console.log(user);
        
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

//!GET CART
router.get('/:id/:uuid', verifyTokenAndAuthorization, async (req,res) => {
    const uuid = req.params.uuid;
    
    try{
        
        const cart = await Carts.findOne({
            where: {uuid},
            include: 'users'
        });

        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
});

//! GET All CARTS
router.get('/', verifyTokenAndAdmin, async (req,res) =>{
    try{

        const cart = await Carts.findAll();

        res.status(200).json(cart);

    }catch(err){
        res.status(200).json(err);
    }
});


module.exports = router;