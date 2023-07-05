'use strict'
const { Model } = require('sequelize')
const CartSchema = (sequelize, DataTypes) =>{
    const {INTEGER, STRING,FLOAT, BOOLEAN, UUID, UUIDV4} = DataTypes;

    const CartDetails = sequelize.define('Carts', {
        uuid:{
            type: UUID,
            defaultValue: UUIDV4,
            allowNull: false,
        },
        userId: {type: INTEGER},
        products: {
            type: STRING,
            get: function() {
                return JSON.parse(this.getDataValue("products"));
            },
            set: function(value){
                return this.setDataValue("products", JSON.stringify(value));
            }
        },// change later
    });       
      
    CartDetails.associate = (models) =>{
        CartDetails.belongsTo(models.User, {
            foreignKey:{
                name: 'userId',
                allowNull:false
            }
        })
    }


    return CartDetails;
}

module.exports = CartSchema;
