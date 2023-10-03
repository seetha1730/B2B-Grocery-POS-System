const express = require("express");
const router = express.Router();
const Order = require("../models/Order.model");
const { isLoggedIn } = require('../middleware/route-guard.js');

const generateOrderPageNumber = (itemLength) => {

  let pages = (itemLength / 5);
  let pageString = pages.toString().split(".");

  if (pageString.length == 2) {
    const pageCount = parseInt(pageString[0]) + 1;
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  } else {
    return Array.from({ length: pages }, (_, i) => i + 1);
  }
};

/* GET order page */
router.get("/order-history", isLoggedIn,(req, res, next) => {
  Order.find()
    .then((orderList) => {


      if (req.session.currentUser.isAdmin) {

        res.render("order-history", { user: req.session.currentUser, orderList, layout: 'layout-admin' });

      }
      else {

        res.render("order-history", { user: req.session.currentUser, orderList, layout: 'layout' });
      }
    })
    .catch((err) => next(err));

});

// API route for all order
router.get("/api/orders", isLoggedIn, (req, res, next) => {
  Order.find()
    .then((orderList) => {
      res.json(orderList);
    })
    .catch((err) => next(err));
});
// API route for all order
router.get("/order-history/goto/:pageNumber", (req, res, next) => {
  const { pageNumber } = req.params;
  const skip = (parseInt(pageNumber) - 1) * 5;

  Order.find().count()
    .then((orderCount) => {
      Order.find()
        .skip(skip)
        .limit(5)
        .then((orderList) => {
          
      if (req.session.currentUser.isAdmin) {

        res.render("order-history", { user: req.session.currentUser,orderPagination: generateOrderPageNumber(orderCount), orderList, layout: 'layout-admin' });

      }
      else {

        res.render("order-history", { user: req.session.currentUser, orderPagination: generateOrderPageNumber(orderCount),orderList, layout: 'layout' });
      }
      
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

//Get call view the order
router.get("/order-history/:orderId", isLoggedIn, (req, res, next) => {
  const orderId = req.params.orderId;

  // Find the order by ID
  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        // If order not found
        return res.status(404).send('Order not found');
      }
      // Send the order details as JSON
      res.json(order);
    
    })

    .catch((err) => next(err));
});

router.post("/orderCreate", isLoggedIn, (req, res, next) => {
  const { Products, total, customerFirstName, customerLastName, customerPhoneNumber, customerId, orderNumber } = req.body;

  Order.create({
    Products: Products.map((product, index) => ({
      product: product.productId,
      productName: product.productName,
      quantity: product.quantity,
    })),
    total,
    customerFirstName,
    customerLastName,
    customerPhoneNumber,
    customerId,
    orderNumber,
    orderDate: new Date(),

  })
    .then(() => {
      res.status(200);

      res.send({ msg: 'order added successfully' })

    })
    .catch(err => next(err));

})
// POST request to delete a product
router.post("/order-history/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Order.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/order-history/goto/1");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;