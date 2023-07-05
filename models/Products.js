'use strict'
const { Model } = require('sequelize');

const ProductsSchema = (sequelize, DataTypes) =>{
    const {INTEGER, STRING,FLOAT, BOOLEAN, UUID, UUIDV4} = DataTypes;

    const ProductDetails = sequelize.define('Products', {
        uuid:{
            type: UUID,
            defaultValue: UUIDV4,
            allowNull: false,
        },
        userId:{type: INTEGER},
        book_title: {type: STRING, required: true},
        book_author: {type: STRING, required: true},
        book_year: {type: STRING},
        img: {type: STRING, required: true},
        price: {type: FLOAT, required: true},
    
    }); 
    
    
    ProductDetails.associate = (models) =>{
        ProductDetails.belongsTo(models.User, {
            foreignKey:{
                name: 'userId',
                allowNull:false
            }
        })
    }


    return ProductDetails;
}

module.exports = ProductsSchema;
