
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) =>{
    const {INTEGER, STRING,FLOAT, BOOLEAN, UUID, UUIDV4} = DataTypes;

    const User = sequelize.define('User', {
        uuid:{
            type: UUID,
            defaultValue: UUIDV4,
            allowNull: false,
        },
        full_name: {type: STRING, 
            allowNull:false,
            validate: {
                notEmpty: true,
                notNull: {msg: 'Name is required'},
            }
        },
        username: {type: STRING, 
            allowNull:false,
            validate: {
                notEmpty: true,
            },
            unique: true,
        },
        email: {type: STRING, 
            allowNull:false,
            validate: {
                notEmpty: true,
                isEmail: {msg: "It must be a valid Email address"},
            },
            unique: true,
        },
        password: {type: STRING,
            allowNull:false,
            validate: {
                notEmpty: true,
            }
        },
        phone_number: {type: STRING, 
            allowNull:false,
            validate: {
                notEmpty: true,
            },
        },
        isAdmin: {type: BOOLEAN,
            allowNull:false,
            defaultValue: false
        },
    });

    User.associate= (models)=>{
        User.hasMany(models.Products, {foreignKey: 'userId', as: 'products'});
        User.hasMany(models.Order, {foreignKey: 'userId', as: 'orders'});
        User.hasMany(models.Carts, {foreignKey: 'userId', as: 'carts'});
    }
    return User;
}



/*
! Add user
app.post("/users", async(req,res) =>{
    const { name, email, role} = req.body
    try{
        const user = await User.create({name, email, role});
        return res.json(user);
    }catch(err){
        return res.status(500).json(err);
    }
});
*/

/*
!Update user

app.put("/users/:id", async(req,res) =>{
    const id = req.params.id;
    const { name, email, role} = req.body;
    try{
        const user = await User.findOne({
            where: {id}
        });
        user.name = name;
        user.email = email;
        user.role = role;

        await user.save();
        return res.json(user);

    }catch(err){
        return res.status(500).json({err: "An error occured"});
    }
});*/

/*
!Delete user
app.delete("/users/:id", async(req,res) =>{
    const id = req.params.id;
    try{
        const user = await User.findOne({
            where: {id}
        });
        await user.destroy();
        return res.json({message: "User Deleted"});
    }catch(err){
        return res.status(500).json({err: "An error occured"});
    }
}); */