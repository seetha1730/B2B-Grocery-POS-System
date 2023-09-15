const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');
const Category = require('../models/Category.model');

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'views' });
});






  module.exports = router;