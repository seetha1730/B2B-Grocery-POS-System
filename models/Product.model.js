const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
      required: false, // Optional field
    },
  },
  {
    timestamps: true,
  }
);

// Add mongoose paginate plugin
ProductSchema.plugin(mongoosePaginate);

const myModel = mongoose.model('pagination', ProductSchema);

module.exports = model('Product', ProductSchema);

