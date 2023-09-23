const express = require('express');
const router = express.Router();

router.get("/inventory", (req, res, next) => {
  res.render('inventory', { root: 'views' });
})





module.exports = router;
