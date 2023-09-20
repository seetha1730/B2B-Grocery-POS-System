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

  const { firstName, lastName, email, password, gender, terms, newsletter } = req.body;

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
      terms,
      newsletter,
      passwordHash: hashedPassword
    });
  })
  .then(() => {
  // Registration successful
  res.redirect('/login');
  })
  .catch(error => {
     // Registration failed
     const errorMessage = 'Registration failed. Please try again.';
     res.render('auth/signup', { errorMessage });
  });
});


// POST login route ==> to process form data
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
 
  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }
 
  User.findOne({ email })
    .then(user => {
      if (!user) {
       // console.log("Email not registered. ");
        res.render('auth/login', { errorMessage: 'Email not registered.' });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        res.render('/profile', { user });
      } else {
        console.log("Incorrect password. ");
        res.render('auth/login', { errorMessage: 'User not found and/or incorrect password.' });
      }
    })
    .catch(error => next(error));
});
   
router.get('/profile', (req, res) => {
  res.render('profile', { userInSession: req.session.currentUser });
});

router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  });
});
module.exports = router;
