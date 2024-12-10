const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const Product = require('./productModel');

// Define the Cart model
const Cart = sequelize.define(
  'Cart',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Define the junction table CartProducts
// const CartProducts = sequelize.define('CartProducts', {
//     quantity: {
//         type: DataTypes.INTEGER,
//         defaultValue: 1,
//         allowNull: false,
//     },
// });

// // Associations
// User.hasOne(Cart, { foreignKey: 'user_id', onDelete: 'CASCADE' });
// Cart.belongsTo(User, { foreignKey: 'user_id' });

// Cart.belongsToMany(Product, { through: CartProducts });
// Product.belongsToMany(Cart, { through: CartProducts });

//module.exports = { Cart, CartProducts };
module.exports = { Cart };
