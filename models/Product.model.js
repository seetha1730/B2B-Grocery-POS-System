const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      lowercase: true,
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, 'Quantity is required'],
      lowercase: true,
      trim: true,
    },
    productPrice: {
      type: Number,
      trim: true,  
    },
    categoryName: {
      type: String, 
    
    },
    stock: {
      type: String, 
    },
    description: {
      type: String,
      required: false, 
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = model('Product', ProductSchema);

