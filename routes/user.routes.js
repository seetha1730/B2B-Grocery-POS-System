const express = require('express');
const router = express.Router();
const { isLoggedIn} = require('../middleware/route-guard.js');

router.get("/profile", isLoggedIn, (req, res) => {
    const isAdmin = req.session.currentUser.email === "admin@admin.com"; // Check if the current user is admin
    const user = req.session.currentUser
    if (req.session.currentUser.isAdmin) {
      res.render("profile", { user, isAdmin, layout: "layout-admin" });
    } else {
      res.render("profile", {
        user: req.session.currentUser,
        isAdmin: isAdmin,
      });
    }
  });

module.exports = router;
