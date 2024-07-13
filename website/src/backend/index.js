const express = require("express")
const path = require("path")
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
// const products_db = require("./models/products.js")
const session = require('express-session');
const post_routes= require("./post")
const webpage_routes= require("./webpage.js")
const adminpage_routes= require("./adminpage.js")
const delete_req= require("./delete_req.js")

const app = express()

// connecting path hrough backend
const pages = path.join(__dirname, "../views")

// Session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));




// connecting to mongo db

mongoose.connect("mongodb://localhost:27017/fruit-bazar")

// for static path
const static_path = path.join(__dirname, "../views/allassets")
const static_path_admin = path.join(__dirname, "../views/admin/allassets")

app.use(express.static(static_path))
app.use(express.static(static_path_admin))

// Body parser middleware to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs")
app.set("views", pages)


// post request 
app.use('/', post_routes);

// delete request
app.use('/', delete_req);

// /////////// page routes
app.use('/', webpage_routes);

/////// admin routes
app.use('/', adminpage_routes);

app.listen(5000, () => {
    console.log("listening to port 5000")
})



