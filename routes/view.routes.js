const express = require('express');
const router = express.Router();



router.get("/setting", (req, res, next) =>{
  res.sendFile('setting.html', { root: 'views' });
}) 

router.get("/profile", (req, res, next) =>{
  res.sendFile('profile.html', { root: 'views' });
}) 
router.get("/inventory", (req, res, next) =>{
  res.sendFile('inventory.html', { root: 'views' });
}) 

router.get("/login", (req, res, next) =>{
  res.sendFile('login.html', { root: 'views' });
})
router.get("/signup", (req, res, next) =>{
  res.sendFile('signup.html', { root: 'views' });
}) 


module.exports = router;
