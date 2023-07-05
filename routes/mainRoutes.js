const router = require('express').Router();
const {checkToken, verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');


router.get('/',(req, res) =>{
    const token = req.cookies.jwt;
    res.render('Frontpage',{
        data:{
            token
        }
    });
});

router.get('/home', checkToken, (req, res) =>{
    let id = false;
    if(req.user){
        console.log(req.user);
        id = req.user.id;
        console.log(id, 'hbhjg');
    } 
    return res.render('Choose', {
        id
    }); 
    
});

router.get('/About-us', (req, res) =>{
    const error = 500;
    const errMessage = 'something went wrong'
    //console.log(err);
        
    return res.render('Error',{data:{
        error: error,
        errMessage: errMessage
        }
    });
});

router.get('/Contact-us', (req, res) =>{
    const error = 500;
    const errMessage = 'something went wrong'
    //console.log(err);
        
    return res.render('Error',{data:{
        error: error,
        errMessage: errMessage
    }});
});

router.get('/Sign-up', (req, res) =>{
    const message = req.flash('message');
    res.render('Signup',{data:
        {
            message,
        }
    });
});

router.get('/Login', (req, res) =>{
    const message = req.flash('message');
    res.render('Login',{data:
        {
            message, 
            referer:req.headers.referer
        }
    });
});


module.exports = router;