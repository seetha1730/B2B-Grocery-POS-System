const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');
const Category = require('../models/Category.model');
const fileUploader = require('../config/cloudinary.config');

const path = require('path'); 

// Display the form for adding a new category
router.get('/product/all', (req, res, next) => {
    Product.find()
    .then(productList => {
      res.send( { productList });
    })
    .catch(err => next(err));
  });
// // GET request to display the product list

// // Display the form for adding a new product
// router.get('/product/add-product', (req, res, next) => {
//   Category.find()
//     .then(categoryList => {
//       console.log("CATEGORY" ,categoryList); // Add this line for debugging
//       res.render('product/add-product', { categoryList });
//     })
//     .catch(err => next(err));
// });

// // POST request to add a new product
// router.post('/product/add-product', fileUploader.single('image'), (req, res) => {
 
//   const { productName, productPrice, quantity, categoryName, stock, description } = req.body;
 
//  // Check if productName is empty
//  if (!productName) {
//   const errors = [{ msg: 'Product name is required.' }];
//   return res.render('product/add-product', { errors, productName, productPrice, quantity });
// }

// // Check if productPrice is empty or not a valid number
// if (!productPrice || isNaN(productPrice)) {
//   const errors = [{ msg: 'Product price is required and must be a valid number.' }];
//   return res.render('product/add-product', { errors, productName, productPrice, quantity });
// }

// // Check if quantity is empty
// if (!quantity) {
//   const errors = [{ msg: 'Quantity is required.' }];
//   return res.render('product/add-product', { errors, productName, productPrice, quantity });

//   }
//     // Continue with creating the product without image
//   const imageUrl = req.file ? req.file.path : '';

//   Product.create({
//     productName,
//     productPrice,
//     categoryName,
//     quantity,
//     stock,
//     description,
//     imageUrl,
//   })
//     .then(() => {
//       console.log('Product added successfully');
//       res.redirect('/product'); // Redirect to the product list page
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).send('Error adding the product');
//     });
// });


// // GET request to display the edit product page
// router.get('/product/:id/edit', (req, res, next) => {
//   const { id } = req.params;

//   Product.findById(id)
//     .then(product => {
//       res.render("product/edit-product", { product });
//     })
//     .catch(err => {
//       next(err);
//     });
// });

// // POST request to edit a product
// router.post('/product/:id/edit', fileUploader.single('image'), (req, res, next) => {
//   const { id } = req.params;
//   const { productName, productPrice, quantity, categoryName, stock, description } = req.body;
//   const imageUrl = req.file.path;

//   Product.findByIdAndUpdate(id, { productName, productPrice, quantity, categoryName, stock, description, imageUrl })
//     .then(() => {
//       res.redirect('/product');
//     })
//     .catch(err => {
//       console.log(err);
//       next(err);
//     });
// });

// // POST request to delete a product
// router.post('/product/:id/delete', (req, res, next) => {
//   const { id } = req.params;

//   Product.findByIdAndRemove(id)
//     .then(() => {
//       res.redirect('/product');
//     })
//     .catch(err => {
//       next(err);
//     });

// });

module.exports = router;
