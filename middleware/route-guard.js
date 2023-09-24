const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/login');
    }
    next();
  };
   
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
      return res.redirect('/');
    }
    next();
  };
   


const isAdmin = (req, res, next) => {
  if (req.session.currentUser && req.session.currentUser.isAdmin) {
    // User is an admin, allow access
    next();
  } else {
    // User is not authorized, redirect to an error page or show a message
    res.status(403).send("Access denied: Admin privileges required.");
  }
};

const isCashier = (req, res, next) => {
  if (req.session.currentUser && !req.session.currentUser.role == "cashier") {
    // User is a cashier, allow access
    next();
  } else {
    // User is not authorized, redirect to an error page or show a message
    res.status(403).send("Access denied: Cashier privileges required.");
  }
};


const isCustomer = (req, res, next) => {
  if (req.session.currentUser && !req.session.currentUser.role == "customer") {
    // User is a cashier, allow access
    next();
  } else {
    // User is not authorized, redirect to an error page or show a message
    res.status(403).send("Access denied: Should be a customer.");
  }
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
  isAdmin,
  isCashier,
  isCustomer
};
