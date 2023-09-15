// routes/auth.routes.js

const { Router } = require("express");
const router = new Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User.model");

// GET route ==> to display the signup form to users
router.get("/signup", (req, res) => res.render("auth/signup"));
// POST route ==> to process form data
router.post("/signup", (req, res, next) => {
  console.log("The form data: ", req.body);

  const { firstName, lastName, email, password, gender, country, terms, newsletter } = req.body;

  // Custom validation
  if (!email || !email.trim()) {
    return res.render("auth/signup", { errors: [{ msg: "Email is required." }] });
  }
  if (!password || password.length < 8) {
    return res.render("auth/signup", { errors: [{ msg: "Password must be at least 8 characters." }] });
  }
  if (!firstName || !firstName.trim()) {
    return res.render("auth/signup", { errors: [{ msg: "First Name is required." }] });
  }
  
  if (!gender || !gender.trim()) {
    return res.render("auth/signup", { errors: [{ msg: "Gender is required." }] });
  }
  if (!country || !country.trim()) {
    return res.render("auth/signup", { errors: [{ msg: "Country is required." }] });
  }
  if (!terms) {
    return res.render("auth/signup", { errors: [{ msg: "You must agree to the terms and conditions." }] });
  }

  
  
  bcryptjs
  .genSalt(saltRounds)
  .then(salt => bcryptjs.hash(password, salt))
  .then((hashedPassword) => {
     User.create({
      firstName,
      lastName,
      email,
      gender,
      country,
      terms,
      newsletter,
      passwordHash: password
    });
  })
      .then(userFromDB => {
        console.log('Newly created user is: ', userFromDB);
        res.redirect('/login');
    })
      .catch(error => next(error));
});

  router.get('/userProfile', (req, res) => res.render('users/user-profile'));
module.exports = router;
