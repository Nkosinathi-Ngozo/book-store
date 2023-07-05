const jwt = require('jsonwebtoken');


const checkToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.JWT_SEC, //token verification through header token,
        //jwt secret string, and a function
            (err, user) =>{
                if(err) {
                    res.cookie('jwt', '', {
                        maxAge: 1
                    });
                    res.status(403)
                    .json('token is not valid');
                }// if there's an error 
                
                req.user = user;
                console.log(req.user, token);
                next();
             });
     }
     else{
        next();
    }
};

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.JWT_SEC, //token verification through header token,
        //jwt secret string, and a function
            (err, user) =>{
                if(err) {
                    res.cookie('jwt', '', {
                        maxAge: 1
                    });
                    res.redirect('/home');
                    // res.status(403)
                    // .json('token is not valid');
                }// if there's an error 
                
                req.user = user;
                console.log(req.user, token, req.params);
                next();
             });
     }
     else{
        req.flash('message', 'not allowed to this until u login')
        res.redirect('/Login');
    }
};


const verifyTokenAndAuthorization = 
(req, res, next) => {
    verifyToken(req, res, () =>{
        const findId = req.params.id;
                    
        if(req.user.id === findId ||
             req.user.isAdmin){
                console.log( req.user.id, findId);
            next();
        }
        else{
            const error = 403;
            const errMessage = 'not allowed to do that'
            console.log(error, req.user.id, findId, req.params);
        
            return res.render('Error',{data : {
                    error: error,
                    errMessage: errMessage
                }
            });    
        }
    });
}

const verifyTokenAndAdmin = 
(req, res, next) => {
    verifyToken(req, res, () =>{
        if(req.user.isAdmin){
            next();
        }
        else{
            const error = 403;
            const errMessage = 'not allowed to do that'
            console.log(error);
        
            return res.render('Error',{data : {
                    error: error,
                    errMessage: errMessage
                }
            });
        }
    });
}



module.exports = {checkToken, verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};