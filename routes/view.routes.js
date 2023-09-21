const express = require('express');
const router = express.Router();



router.get("/settings", (req, res, next) => {
  res.render('settings', { root: 'views' });
})

// router.get("/profile", (req, res, next) => {
//   res.render('profile', { root: 'views' });
// })
router.get("/inventory", (req, res, next) => {
  res.render('inventory', { root: 'views' });
})

router.get("/login", (req, res, next) => {
  res.render('auth/login', {root: 'views', layout:false });
})

router.get("/signup", (req, res, next) => {
  res.render('auth/signup', {root: 'views',layout:false });
})
// router.get("profile", (req, res, next) => {
//   res.render('/profile', { root: 'views' });
// })




module.exports = router;
