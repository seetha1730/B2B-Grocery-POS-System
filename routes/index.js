const router = require("express").Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
/* GET home page */
router.get("/", (req, res, next) => {

//const user=req.session.isLoggedIn
//console.log("loginin",user)
const user= req.session.currentUser
//console.log("log",isLoggedIn())
   if(isLoggedIn){
    res.render("index",{user:true});
   }else if (!isLoggedIn){
   res.render("index",{user:false});
   }
});

module.exports = router;
