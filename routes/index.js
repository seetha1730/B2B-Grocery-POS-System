
const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const Category = require("../models/Category.model");

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
/* GET home page */
router.get("/", (req, res, next) => {
const user= req.session.currentUser

   if(isLoggedIn){
    res.render("index",{user:true});
   }else if (!isLoggedIn){
   res.render("index",{user:false});
   }
});

router.get("/search/:searchTerm", (req, res, next) => {
  const { searchTerm } = req.params;
  Product.find({ productName: {

    $regex: searchTerm, $options: "i" } })  // Case-insensitive search


    .then((searchResults) => {
      res.json(searchResults); // Send the search results as JSON
    })
    .catch((err) => next(err));
});



module.exports = router;