// Import Mongoose
const mongoose = require('mongoose');

// Define the category schema
const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, 'Category name is required'],
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId, // Allow both ObjectIds and strings
      ref: 'Category',
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

// Create and export the Category model
module.exports = mongoose.model('Category', categorySchema);