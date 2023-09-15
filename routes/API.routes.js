const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');

let shoppingCart =[]
let subTotal = 0;
let tax = 0;
let total =0;
router.get('/search/:searchTerm', (req, res, next) => {

    const {searchTerm}=req.params
    
     Product.find({ productName: { $regex: searchTerm, $options: 'i' } }) // Case-insensitive search
      .then(searchResults => {
    
           res.json(searchResults); // Send the search results as JSON
      })
       .catch(err => next(err));
  });

  router.post('/cart/add', (req, res) => {
    const product = req.body;
    const findProduct = shoppingCart.find(item => item._id === product._id);
    if(!findProduct){
      shoppingCart.push({...product, noItems: 1});
    }else {
      findProduct.noItems ++
    }
    const productTax = product.productPrice * 0.1; // Assuming 10% tax, you can adjust this value as needed
  
    subTotal += product.productPrice + productTax;
    tax += productTax; 
    total = subTotal+tax

    
    res.json({ message: 'Product added to cart', cart: shoppingCart, subTotal,tax,total });
  });

  router.get('/cart/contents', (req, res) => {
    
    res.json({shoppingCart, subTotal, tax, total});
  });

  // Increment the quantity of a product in the cart
  router.get('/cart/increment/:id', (req, res) => {
    const {id} = req.params;
    const findProduct = shoppingCart.find(item => item._id === id);
  
    if (findProduct) {
      findProduct.noItems++;
      res.json({ message: 'Product quantity incremented', cart: shoppingCart, subTotal,tax,total});
     const productTax = findProduct.productPrice * 0.1; // Assuming 10% tax, you can adjust this value as needed
    
    subTotal += findProduct.productPrice + productTax;
    tax += productTax; 
    total = subTotal+tax
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });

// Decrement the quantity of a product in the cart
router.get('/cart/decrement/:id', (req, res) => {
  const {id} = req.params;
  const findProduct = shoppingCart.find(item => item._id === id);

  if (findProduct) {
    if (findProduct.noItems > 1) {
      findProduct.noItems--;
      res.json({ message: 'Product quantity decremented', cart: shoppingCart, subTotal ,tax,total});
    } else {
      // Remove the product from the cart if quantity is 1
      shoppingCart = shoppingCart.filter((item) => item._id !== id);
      res.json({ message: 'Product removed from cart', cart: shoppingCart, subTotal ,tax,total});
    }
    const productTax = findProduct.productPrice * 0.1; // Assuming 10% tax, you can adjust this value as needed
      
      subTotal -= findProduct.productPrice - productTax;
      tax -= productTax; 
      total = subTotal+tax
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

   

// router.get('/cart/discount', (req, res) => {
//   const product = req.body;
//   const findProduct = shoppingCart.find(item => item._id === product._id);

//   res.json({ message: 'Product added to cart', cart: shoppingCart, subTotal, tax });
// });


   
module.exports = router;