const express = require("express")
// ℹ️ Connects to the database
require("./db");
const app = express()
const port = 3000

app.use(express.static('public'))



// Define your routes
const indexRouter = require('./routes/view.routes');
const ProductRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');

// Use the route handlers
app.use('/', ProductRoutes);
app.use('/', categoryRoutes);


app.get("/", (req, res) => {

  res.sendFile(__dirname + "/views/index.html")
  
})

app.get("/inventory", (req, res) => {
  
  res.sendFile(__dirname + "/views/inventory.html")

})
app.get("/setting", (req, res) => {
  
  res.sendFile(__dirname + "/views/setting.html")

})

app.get("/profile", (req, res) => {
  
  res.sendFile(__dirname + "/views/profile.html")

})

app.get("/product", (req, res) => {
  
     res.sendFile(__dirname + "/views/product/product.html")
  
  })


app.get("/category", (req, res) => {
  
    res.sendFile(__dirname + "/views/category/category.html")
  
  })


app.listen(port, () => {
  console.log(`App running on port ${port}`)
})