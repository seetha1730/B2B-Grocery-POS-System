const express = require('express');
const router = express.Router();
const Category = require('../models/Category.model');
const fileUploader = require('../config/cloudinary.config');

// Display the form for adding a new category
router.get('/category/all', (req, res, next) => {
  Category.find()
  .then(categoryList => {
    res.send( { categoryList });
  })
  .catch(err => next(err));
});



// Display the form for adding a new category
router.get('/category/add-category', (req, res, next) => {
  Category.find()
    .then(categoryList => {
      res.render('category/add-category', { categoryList });
    })
    .catch(err => next(err));
});
// Handle the POST request to add a new category
router.post('/category/add-category', fileUploader.single('image'), (req, res, next) => {
    const { categoryName, parentCategory } = req.body;
  
    if (!categoryName) {
      const errors = [{ msg: 'Category name is required.' }];
      return res.render('category/add-category', { errors, categoryName, parentCategory });
    }
  
    // Continue with creating the category
    const imageUrl = req.file ? req.file.path : '';
  
    Category.create({
      categoryName,
      parentCategory: parentCategory || null, // Set to null if not provided
      imageUrl,
    })
      .then(() => {
        console.log('Category added successfully');
        res.redirect('/category'); // Redirect to the category list page
      })
      .catch(err => next(err));
  });
//Display the category list
router.get('/category', (req, res, next) => {
  Category.find().populate('parentCategory')// Populate the parentCategory field
    .then(categoryList => {
      res.render('category/category', { categoryList });
    })
    .catch(err => next(err));
});

// Display the edit category page
router.get('/category/:id/edit', (req, res, next) => {
  const { id } = req.params;

  Category.findById(id)
    .then(category => {
      res.render('category/edit-category', { category });
    })
    .catch(err => next(err));
});

// Handle the POST request to edit a category
router.post('/category/:id/edit', fileUploader.single('image'), (req, res, next) => {
  const { id } = req.params;
  const { categoryName, parentCategory } = req.body;
  const imageUrl = req.file.path;

  Category.findByIdAndUpdate(id, { categoryName, parentCategory, imageUrl })
    .then(() => {
      res.redirect(`/category/${id}`); // Redirect to the edited category's page
    })
    .catch(err => next(err));
});

// Handle the POST request to delete a category
router.post('/category/:id/delete', (req, res, next) => {
  const { id } = req.params;

  Category.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/category');
    })
    .catch(err => next(err));
});

module.exports = router;
