const router = require('express').Router();
const {checkToken, verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');
const {User, Products} = require('../models');
const validator = require('validator');
const fs = require('fs');
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/uploadedImages')
    },
    filename: (req, file, cb) =>{
        console.log(file);
        req.filename = Date.now() + path.extname(file.originalname);
        console.log('books saved successfully!!!');
        cb(null, req.filename); 
    }
});

const multerFilter = (req, file, cb) =>{
    if(file){
        let ext = path.extname(file.originalname);
        const {book_title, book_author, book_year, price} = req.body;
        console.log(book_title, book_author, book_year, price, 'ffff');
        if(book_title && book_author && book_year && price){
            if(ext === '.jpg' || ext === '.jpeg' || ext === '.png'){
                console.log('succcccccessssss', file.mimetype)
                cb(null, true);
            }
            else{
                console.log('not acceptible file format', ext)
            }
        }
        else{
            console.log('nooooooo');
            cb(null, false);
        }
    }
}


const upload = multer({
    storage: storage,
    fileFilter: multerFilter,
});



//!CREATE
router.post('/sellBook/:uuid', verifyTokenAndAuthorization, upload.single('img'), async (req, res)=>{


    const validationError = [];
    
    req.body.img = req.filename;

    req.body.userId = req.params.id;

    const {book_title, book_author, book_year, price, img} = req.body;

    console.log(book_title, book_author, book_year, price, req.body.img);
    
    
    console.log(req.params.id);
    
    
    try{
        if(validator.isEmpty(book_title)){
            validationError.push('Book title field is empty');
        }


        if(validator.isEmpty(book_author)){
            validationError.push('Book author field is empty');
        }


        if(validator.isEmpty(book_year)){
            validationError.push('Book year field is empty');
        }


        if(book_year.length !== 4){
            validationError.push('Enter valid book publish year');
        }
        

        if(img === undefined && price){
            validationError.push('Image field is empty');
        }


        if(validator.isEmpty(price)){
            validationError.push('price field is empty');
        }

        if(validationError.length){
            for(let i = 0; i < validationError.length; i++){
                console.log(validationError[i]);
            }
            return;
        }
        //const newProduct = new Products(req.body);
        const uuid = req.params.uuid;
        const user = await User.findOne({
            where:{uuid}
        });

        req.body.userId = user.id;


        const newProduct = new Products(req.body);

        console.log(newProduct);

        const savedProduct = await newProduct.save();

        return res.status(200).json(newProduct);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

//!UPDATE
router.put('/:uuid', verifyTokenAndAuthorization, async (req,res) => {
    
    try{
        const uuid = req.params.uuid;//id in url
        
        const UpdatedProduct = await Products.update(req.body,{
            where: {uuid},//checls for same id in database
        });

        const updatedProductReport = await Products.findOne({
            where: {uuid}
        });
        const{id, createdAt, updatedAt, img,
              ...others} = updatedProductReport.dataValues;

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
router.delete('/:uuid', verifyTokenAndAuthorization, async (req, res) =>{
    const uuid = req.params.uuid;
    try{
        const productToDelete = await Products.findOne({
            where: {uuid},
        });// find user to delete through id

        fs.unlink(`../public/uploadedImages/${productToDelete.img}`, (err)=>{
            if(err) {
                return console.log(err);
            }
            console.log('file deleted successfully');
            
        });

        await productToDelete.destroy();// deletion of user

        return res.status(200).json("Product Deleted...");
    }catch(err){
        console.log(err);
        return res.status(500).json("An error occured");

    }
});

//!GET PRODUCT

router.get('/find/:id/:uuid', async (req,res) => {
    const uuid = req.params.uuid;
    //const id = parseInt(ID);
    try{
        console.log(typeof uuid, uuid)
        const product = await Products.findOne({
            where: {uuid}, 
            include: User
        });


        res.render('singleProduct', {
            product
        });
        //res.status(200).json(product);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});


//! GET CERTAINS USERS PRODUCTS
router.get('/users/find/:uuid', async ( req, res ) =>{
    //returns users products
    const uuid = req.params.uuid;

    const user = await User.findOne({
        where:{uuid}, 
        include: 'products'
    });

    // const userId = user.id;

    // const products = await Products.findAll({
    //     where:{userId}
    // });

    // for(let i = 0; i < products.length; i++){
    //     console.log(products[i], 'hsv');
    // }

    res.json(user);

});

//! GET All PRODUCTS
router.get('/', async (req,res) =>{
    const qNew = req.query.new;
    const qModule = req.query.module;
    const Year = new Date().getFullYear();
    const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
    try{
        let products;
         console.log(req.query.new);
        if(qNew){
            console.log(sevenDaysAgo)
            console.log(req.query.new);
            //products = await Products.findAll().sort({createdAt: -1}).limit(1) + 'founds';
            products = await Products.findAll({
                limit: 2,
                order: [
                    ['createdAt', 'DESC'],
                ],
            });
        }
        else if(qModule){
            console.log(req.query.module);
            products = await Products.findAll({
                module:{
                    $in: [qModule],
                },
            });
        }
        else{
            //products = await Products.findAll({include: ['User']});
            products = await Products.findAll({include: User});
        }
        console.log(products);
        res.render('testimages', {
            data:{
                images:products
            }
        });
        //return res.status(200).json(products);
    }catch(err){
        console.log(err);
        return res.status(500).json("An error occured");
    }
});


router.get('/sell/:uuid', verifyToken, async (req,res) =>{
    const id = req.params.uuid;
    return res.render('sellbook',{
        id
    });
}).get('/sell', async (req,res) =>{
    req.flash('message', 'to access page sign up/login');
    res.redirect('/Login');
});
     
   

module.exports = router;