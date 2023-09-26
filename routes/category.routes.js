const express = require('express');
const router = express.Router();
const Category = require('../models/Category.model');
const fileUploader = require('../config/cloudinary.config');
const { isAdmin } = require('../middleware/route-guard');


const generateCPageNumber = (itemLength) => {

  let pages = (itemLength / 5);
  let pageString = pages.toString().split(".");
  console.log("Total pages:", pages);
  if (pageString.length == 2) {
    const pageCount = parseInt(pageString[0]) + 1;
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }else {
     return Array.from({ length: pages }, (_, i) => i + 1);
  }
};
// Display the form for adding a new category
router.get('/category/all', (req, res, next) => {
  Category.find()
  .then(categoryList => {
    res.send( { categoryList });
  })
  .catch(err => next(err));
});
router.get("/category/:pageNumber", isAdmin, (req, res, next) => {
  const { pageNumber } = req.params;
  const skip = (parseInt(pageNumber) - 1) * 5;
  Category.find().count()
  .then((catCount) => {

  Category.find().populate('parentCategory')// Populate the parentCategory field
  .skip(skip)
  .limit(5)
  .then(categoryList => {

      res.render('category/category', { categoryList, categoryPagination: generateCPageNumber(catCount),layout: 'layout-admin' });
    })
    
    .catch((err) => next(err));
}).catch((err) => next(err));
});


// Display the form for adding a new category
router.get('/category/add-category', isAdmin,(req, res, next) => {
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
router.get('/category', isAdmin,(req, res, next) => {
  Category.find().populate('parentCategory')// Populate the parentCategory field
    .then(categoryList => {

      res.render('category/category', { categoryList, layout: 'layout-admin' });
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
