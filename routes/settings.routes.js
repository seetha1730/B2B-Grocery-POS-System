const express = require('express');
const router = express.Router();
// const Settings = require('../models/Settings.model');
// const StoreAddress = require('../models/Store.model');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middleware/route-guard.js');

router.get('/settings', isLoggedIn, (req, res) => {
          
        if (req.session.currentUser.isAdmin){
            
          res.render("settings",{user:req.session.currentUser, layout: 'layout-admin'});
          
      }
      else
      {
        
     res.render('settings', {
       user: req.session.currentUser,layout:'layout'
     });
   }

  });



module.exports = router;
