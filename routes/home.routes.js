const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const Category = require("../models/Category.model");

router.get("/", (req, res) => {
  res.sendFile("index.html", { root: "views" });
});

router.get("/search/:searchTerm", (req, res, next) => {
  const { searchTerm } = req.params;
  console.log(searchTerm);
  Product.find({ productName: { $regex: searchTerm, $options: "i" } }) // Case-insensitive search
    .then((searchResults) => {
      res.json(searchResults); // Send the search results as JSON
    })
    .catch((err) => next(err));
});

module.exports = router;
