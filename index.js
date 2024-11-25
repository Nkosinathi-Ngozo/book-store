const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const db = require('./models');
const mainRoute = require('./routes/mainRoutes');
const userRoute = require('./routes/UserRoutes');
const authRoute = require('./routes/auth');
const productsRoute = require('./routes/ProductsRoutes');
const orderRoute = require('./routes/orderRoutes');
const cartsRoute = require('./routes/CartsRoutes');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');



app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(flash());

app.use(session({
    secret:'test',
    saveUninitialized: true,
    resave: true
}));

app.use(express.json());
app.use('/', mainRoute);
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/products', productsRoute);
app.use('/order', orderRoute);
app.use('/carts', cartsRoute);

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


db.sequelize.sync().then((req) => {
    
});

app.listen(process.env.PORT || 5000, () =>{
    console.log('backend server is running at localhost:5000');
});