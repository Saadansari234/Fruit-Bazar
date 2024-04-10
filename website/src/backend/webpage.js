const express = require('express');
const webpage_router = express.Router();
const products_db = require('./models/products.js')


/////////// page routes
webpage_router.get("/", async (req, res) => {
    const products_data = await products_db.find();
    res.render("index", { products_data })
})
webpage_router.get("/shop", (req, res) => {
    res.render("shop", { message: "FRESH AND ORGANIC", title: "Shop" })
})
webpage_router.get("/contact", (req, res) => {
    res.render("contact", { message: "GET 24/7 SUPPORT", title: "Contact Us" })
})
webpage_router.get("/about", (req, res) => {
    res.render("about", { message: "WE SALE FRESH FRUITS", title: "About Us" })
})
webpage_router.get("/checkout", (req, res) => {
    res.render("checkout", { message: "FRESH AND ORGANIC", title: "Check Out Product" })
})

module.exports= webpage_router