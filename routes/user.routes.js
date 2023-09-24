const express = require('express');
const router = express.Router();
// const Settings = require('../models/Settings.model');
// const StoreAddress = require('../models/Store.model');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middleware/route-guard.js');

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
