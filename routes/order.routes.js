
const express = require("express");
const router = express.Router();
const Order = require("../models/Order.model");
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middleware/route-guard.js');



/* GET home page */
router.get("/order-history", isLoggedIn, (req, res, next) => {
    console.log('inside')
    Order.find()
    .then((orderList) => {
  console.log(orderList)
      res.render('order-history', { orderList });
    })
    .catch((err) => next(err));

});
router.post("/orderCreate", isLoggedIn, (req, res, next) => {
     const { Products, total, customerFirstName, customerLastName, customerPhoneNumber ,customerId,orderNumber} = req.body;
     
    Order.create({
        Products: Products.map((product, index) => ({
            product:product.productId, // Assuming productId is sent in the request
            productName: product.productName,
            quantity: product.quantity,
          })),
         total,
         customerFirstName,
         customerLastName,
         customerPhoneNumber,
         customerId,
         orderNumber

        })
        .then(() => {
            res.status(200);
            res.send({msg: 'order added successfully'})
         
        })
        .catch(err => next(err));

    })



module.exports = router;