const express = require('express');
const router = express.Router();

router.get("/analystics", (req, res, next) => {
  res.render('analystics', { root: 'views' });
})





module.exports = router;
