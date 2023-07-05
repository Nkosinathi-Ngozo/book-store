'use strict'
const { Model } = require('sequelize');

const OrderSchema = (sequelize, DataTypes) =>{
    const {INTEGER, STRING,FLOAT, BOOLEAN, UUID, UUIDV4} = DataTypes;

    const OrderDetails = sequelize.define('Order', {
        uuid:{
            type: UUID,
            defaultValue: UUIDV4,
            allowNull: false,
        },
        userId: {type: INTEGER},
        products:{type: STRING,
            allowNull:false,
            validate: {
                notEmpty: true,
            },
            get() {
                return this.getDataValue('productId').split(';')
            },
            set(val) {
               this.setDataValue('quantity',val.join(';'));
            },
            
        },
        amount: {type: FLOAT, required: true},
        status: {type: STRING, default: 'pending'},

    });
    
    
    OrderDetails.associate = (models) =>{
        OrderDetails.belongsTo(models.User, {
            foreignKey:{
                name: 'userId',
                allowNull:false
            }
        })
    }
          
    return OrderDetails;
}

module.exports = OrderSchema;
