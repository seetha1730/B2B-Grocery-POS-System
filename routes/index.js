
const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const Category = require("../models/Category.model");

const { isLoggedIn, isLoggedOut, isAdmin } = require('../middleware/route-guard.js');
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

router.get("/search/:searchTerm",(req, res, next) => {
  const { searchTerm } = req.params;
  Product.find({ productName: {

    $regex: searchTerm, $options: "i" } })  // Case-insensitive search


    .then((searchResults) => {
      res.json(searchResults); // Send the search results as JSON
    })
    .catch((err) => next(err));
});


router.get("/search/customer/:customerId",(req, res, next) => {
   const { customerId } = req.params;
   console.log(customerId)
   User.findOne({ customerId })  // Case-insensitive search customer
 
     .then((customerResult) => {
      console.log(customerResult)
       res.json(customerResult); // Send the search customer results as JSON
     })
     .catch((err) => next(err));
 });

module.exports = router;