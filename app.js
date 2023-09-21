
const express = require("express")
// ℹ️ Connects to the database
require("./db");
const path = require('path')
const app = express()
const port = 3001
const bodyParser = require('body-parser');
const hbs = require("hbs");
const cors = require('cors');
// use session here:  
require('./config/session.config')(app);

app.use(cors()); 
// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'))
app.set("views", path.join(__dirname, "/", "views"));
app.set("view engine", "hbs");


hbs.registerHelper('inc', function (value, options) {
  return parseInt(value) + 1;
});

// Define your routes
const indexRoutes = require('./routes/index');
const viewRoutes = require('./routes/view.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const settingsRoutes = require('./routes/settings.routes');
const storeRoutes = require('./routes/store.routes');

const authRoutes = require('./routes/auth.routes');


// Use the route handlers
app.use('/', indexRoutes);
app.use('/', productRoutes);
app.use('/', categoryRoutes);
app.use('/', viewRoutes);
app.use('/', settingsRoutes);
app.use('/', storeRoutes);
app.use('/',authRoutes);


app.get("/inventory", (req, res) => {

  res.render("inventory")

})


// app.get("/profile", (req, res) => {

//   res.render("profile")

// })

// app.get("/product", (req, res) => {

//   res.render("product")

// })
// app.get("/auth", (req, res) => {

//   res.render("auth")

// })


// app.get("/category", (req, res) => {

//   res.render("category")

// })


app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
