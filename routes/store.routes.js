const express = require('express');
const router = express.Router();
const StoreAddress = require('../models/Store.model');

// Create a new store address for a specific branch
// Update a specific store address
router.post('/store-address', (req, res) => {
    const { storeName, addressLine1, addressLine2, pincode, country, state } = req.body;
  
    // Define the query to find the store address by storeName
    const query = { storeName: storeName };
  
    // Define the update to be applied
    const update = {
      $set: {
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        pincode: pincode,
        country: country,
        state: state,
      },
    };
  
    // Specify options to upsert (create if not exists) and return the updated document
    const options = { upsert: true, returnOriginal: false };
  
    // Use findOneAndUpdate to update the store address
    StoreAddress.findOneAndUpdate(query, update, options)
      .then((result) => {
        if (result) {
          console.log('Store address updated successfully');
          res.redirect('/settings'); // Redirect to the settings page
        } else {
          console.log('Store address not found; a new one was created');
          res.redirect('/settings'); // Redirect to the settings page
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error updating the store address');
      });
  });
  



module.exports = router;
