const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const { isLoggedIn} = require('../middleware/route-guard.js');

/* GET home page */
router.get("/", isLoggedIn, (req, res, next) => {
const user = req.session.currentUser
   if (req.session.currentUser.isAdmin){
       res.render("index",{user, layout: 'layout-admin'}); 
   }
   else
   {
      res.render("index",{user});

   }

});
//GET the search result of product
router.get("/search/:searchTerm",(req, res, next) => {
  const { searchTerm } = req.params;
  Product.find({ productName: {

    $regex: searchTerm, $options: "i" } }) 


    .then((searchResults) => {
      res.json(searchResults); // Send the search results as JSON
    })
    .catch((err) => next(err));
});

//GET the search customer 
router.get("/search/customer/:customerId",(req, res, next) => {
   const { customerId } = req.params;

   User.findOne({ customerId })  // Case-insensitive search customer
 
     .then((customerResult) => {
    
       res.json(customerResult); // Send the search customer results as JSON
     })
     .catch((err) => next(err));
 });

module.exports = router;