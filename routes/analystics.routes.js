const express = require('express');
const router = express.Router();
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middleware/route-guard.js');

router.get("/analystics", isAdmin,isLoggedIn, (req, res, next) => {
  
  res.render('analystics', { root: 'views' ,user:req.session.currentUser, layout: 'layout-admin'});
})





module.exports = router;
