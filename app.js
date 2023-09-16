const express = require("express")
// ℹ️ Connects to the database
require("./db");
const path = require('path')
const app = express()
const port = 3000

const hbs = require("hbs");

app.use(express.static('public'))
app.set("views", path.join(__dirname, "/", "views"));
app.set("view engine", "hbs");



// Define your routes
const viewRoutes = require('./routes/view.routes');
const ProductRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const homeRoutes = require('./routes/home.routes');
// Use the route handlers
app.use('/', ProductRoutes);
app.use('/', categoryRoutes);
app.use('/', homeRoutes);
app.use('/', viewRoutes);



app.get("/", (req, res) => {

  res.render("index")

})

app.get("/inventory", (req, res) => {

  res.render("inventory")

})
app.get("/settings", (req, res) => {

  res.render("settings")

})

app.get("/profile", (req, res) => {

  res.render("profile")

})

app.get("/product", (req, res) => {

  res.render("product")

})


app.get("/category", (req, res) => {

  res.render("category")

})


app.listen(port, () => {
  console.log(`App running on port ${port}`)
})