// routes/auth.routes.js
const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const saltRounds = 10;
const User = require("../models/User.model");

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

// GET route ==> to display the signup form to users
router.get("/signup", isLoggedOut, (req, res) => res.render("auth/signup"));
// POST route ==> to process form data
router.post("/signup", (req, res, next) => {
  console.log("The form data: ", req.body);

  const { firstName, lastName, email, password, gender, terms, newsletter } = req.body;
   //password atleast 6 chars 
  // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  // if (!regex.test(password)) {
  //   res
  //     .status(500)
  //     .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
  //   return;
  // }

  // Custom validation
  if (!email || !email.trim()) {
    return res.render("auth/signup", { errorMessage: "Email is required." ,layout:false});
  }
  if (!password || password.length < 6) {
    return res.render("auth/signup", { errorMessage : "Password must be at least 6 characters.",layout:false });
  }
  if (!firstName || !firstName.trim()) {
    return res.render("auth/signup", { errorMessage : "First Name is required.",layout:false  });
  }
  
  if (!gender || !gender.trim()) {
    return res.render("auth/signup", { errorMessage: "Gender is required.",layout:false});
  }

  if (!terms) {
    return res.render("auth/signup", { errorMessage: "You must agree to the terms and conditions.",layout:false});
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
  .then((userFromDB) => {
  // Registration successful
  console.log("Newly created user is: ", userFromDB);
  res.redirect('/login');
  })
  .catch((error) => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render('auth/signup', { errorMessage: error.message, layout:false});
    } else if (error.code === 11000) {

      //console.log(" ");

      res.status(500).render('auth/signup', {
        // errorMessage: 'User not found and/or incorrect password.'
        errorMessage: "Username and email need to be unique. Either username or email is already used. ",layout:false
      });
    } else {
      next(error);
    }
}) 
});

//////////// L O G I N ///////////

// GET route ==> to display the login form to users
router.get('/login', (req, res) => res.render('auth/login'));


// POST login route ==> to process form data

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.',
      layout: false
    });
    return;
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email not registered.', layout: false });
        return;
      }

      if (bcryptjs.compareSync(password, user.passwordHash)) {
        // Password matches

        // Set the session data
        req.session.currentUser = user;
        console.log('Session after login:', req.session); // Add this line for debugging

        // Check if the user is an admin
        const isAdmin = user.email === 'admin@admin.com';
        console.log('Is Admin:', isAdmin); // Add this line for debugging


        res.render('profile', { user, isAdmin });
      } else {
        res.render('auth/login', { errorMessage: 'User not found and/or incorrect password.', layout: false });
      }
    })
    .catch(error => next(error));
});
// router.post('/login', (req, res, next) => {
//   console.log('SESSION =====> ', req.session);
//   const { email, password } = req.body;

//   if (email === '' || password === '') {
//     res.render('auth/login', {
//       errorMessage: 'Please enter both, email and password to login.',
//       layout:false
//     });
//     return;
//   }
 
//   User.findOne({ email })
//     .then(user => {
   
//       if (!user) {
//        // console.log("Email not registered. ");
//         res.render('auth/login', { errorMessage: 'Email not registered.' ,layout:false});
//         return;

//       }
//       if (bcryptjs.compareSync(password, user.passwordHash)) {
//          // Password matches
//          if (user.email === 'admin@admin.com' && bcryptjs.compareSync('admin123', user.passwordHash)) {
//           const isAdmin = true;
//           req.session.currentUser = user; // Make sure this sets the correct user object
//           res.render('profile', { user, isAdmin });
//         }
//       } else {
       
//         res.render('auth/login', { errorMessage: 'User not found and/or incorrect password.',layout:false });
//       }
//     })
//     .catch(error => next(error));
// });
   
router.get('/profile', isLoggedIn, (req, res) => {
 const isAdmin = req.session.currentUser && req.session.currentUser.email === 'admin@admin.com';// Check if the current user is admin
 //const isAdmin = req.session.currentUser && req.session.currentUser.email === 'admin@admin.com';
 //const isAdmin = req.session.currentUser?.email === 'admin@admin.com';

  res.render('profile', {
    user: req.session.currentUser,
    isAdmin: isAdmin
  });
});

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  });
});
module.exports = router;
