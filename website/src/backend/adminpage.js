const express = require('express');
const admin_router = express.Router();
const products_db = require('./models/products.js')

/////// admin routes
admin_router.get("/admin", async (req, res) => {
    try {
        // Fetch the top 3 products from the database
        const topProducts = await products_db.find().sort({ price: -1 }).limit(3);

        // Render the EJS template and pass the topProducts data to it
        res.render('admin/index', { topProducts: topProducts });
    } catch (error) {
        // Handle error
        console.error('Error fetching top products:', error);
        res.status(500).send('Internal Server Error'); // Example error handling
    }
})

admin_router.get("/admin/top3", (req, res) => {
    // Retrieve success message from session
    const message = req.session.successMessage || '';
    // Retrieve error message from session
    const errmessage = req.session.errorMessage || '';
    
    // Clear messages from session
    delete req.session.successMessage;
    delete req.session.errorMessage;

    // Render admin/top3 page with messages
    res.render('admin/top3', { message: message, errmessage: errmessage });
});

admin_router.get("/admin/login", (req, res) => {
    res.render("admin/login")
})

admin_router.get("/admin/shops", (req, res) => {
    res.render("admin/shops")
})
admin_router.get("/admin/offers", (req, res) => {
    res.render("admin/offers")
})

// for 404 page
admin_router.use((req, res, next) => {
    if (req.originalUrl.startsWith("/admin")) {
        // If it's an admin route, render the admin error page
        res.render("admin/error");
    } else {
        // Otherwise, render the regular error page
        res.render("error");
    }
});


module.exports= admin_router