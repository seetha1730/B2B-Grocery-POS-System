const express = require("express");
const router = express.Router();
const Order = require("../models/Order.model");
const { isLoggedIn } = require('../middleware/route-guard.js');
const StoreAddress = require('../models/Store.model');
const receipt = require('receipt');
const fs = require('fs');

receipt.config.currency = '€'; // The currency symbol to use in output.
receipt.config.width = 50;     // The amount of characters used to give the output a "width".
receipt.config.ruler = '='; 

const generateRecipt = (store, order ) => {
  const receiptContentArray = []
  const addresslock = { type: 'text', value: [
    store.storeName,
    store.addressLine1,store.addressLine2,
    store.country,store.country,
    store.pincode,
], align: 'center' }

const emptyLine = { type: 'empty' }
const orderInfo = { type: 'properties', lines: [
  { name: 'Order Number', value: order.orderNumber },
  { name: 'Date', value: order.orderDate }
] }
const productsBlock =  { type: 'table', lines: [

   ...order.Products.map(item => ({
    
     item: item.productName, qty: parseInt(item.quantity), cost: (item.price * 100) }))
] }

const totalInfo =  { type: 'properties', lines: [
  { name: 'TAX (10.00%)                         ', value: `€${parseFloat(order.tax).toFixed(2)}` },
  { name: 'SubTotal amount (excl. TAX)          ', value: ` €${parseFloat(order.subTotal).toFixed(2)}` },
  { name: 'Total amount (incl. TAX)             ', value: `€${parseFloat(order.total).toFixed(2)}` }
] }
receiptContentArray.push(addresslock);
receiptContentArray.push(emptyLine);
receiptContentArray.push(orderInfo)
receiptContentArray.push(productsBlock)
receiptContentArray.push(emptyLine);
receiptContentArray.push(totalInfo)


    return receipt.create(receiptContentArray)
}
const generateOrderPageNumber = (itemLength) => {

  let pages = (itemLength / 10);
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
router.get("/api/printReceipt/:orderNumber", (req, res) => {
  console.log(req.params.orderNumber)
  StoreAddress.find()
    .then((storeData) => {
      Order.findOne({orderNumber: req.params.orderNumber})
        .then((orderList) => {
          console.log(generateRecipt(storeData[0],orderList))
          fs.writeFile(`recipts/${req.params.orderNumber}.txt`, generateRecipt(storeData[0],orderList),(data) => console.log(data))
          res.send( generateRecipt(storeData[0],orderList))
        })
        .catch((error) => {
          console.error("Error fetching order:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    })
    .catch((error) => {
      console.error("Error fetching store data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
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
  const skip = (parseInt(pageNumber) - 1) * 10;

  Order.find().count()
    .then((orderCount) => {
      Order.find()
        .skip(skip)
        .limit(10)
        .then((orderList) => {
          orderList.forEach(item => item.total = parseFloat(item.total).toFixed(2))
      

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
  const { Products, total,tax, subTotal,customerFirstName, customerLastName, customerPhoneNumber, customerId, orderNumber } = req.body;

  Order.create({
    Products: Products.map((product, index) => ({
      product: product.productId,
      productName: product.productName,
      quantity: product.quantity,
      price: product.price,
      
    })),
    total,
    tax,
    subTotal,
    customerFirstName,
    customerLastName,
    customerPhoneNumber,
    customerId,
    orderNumber,
    orderDate: new Date(),

  })
    .then(() => {
      res.status(200);

      res.send({ msg: 'order added successfully',orderNumber })

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