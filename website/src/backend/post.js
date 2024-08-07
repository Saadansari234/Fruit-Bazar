const express = require('express');
const post_router = express.Router();
const products_db= require('./models/products.js')
const {upload, multer_router} = require("./multer.js") 
const shops_db= require("./models/shops.js")


post_router.use('/', multer_router)
// /////// Handle POST request to /submitProduct
post_router.post('/submitProduct', upload.single('image'), async (req, res) => {
    try {
        // Check if there are already three products
        const productCount = await products_db.countDocuments({});
        if (productCount >= 3) {
            // Set error message in session
            req.session.errorMessage = 'Only three products are allowed';
            return res.redirect('/admin/top3'); // Redirect to admin/top3 page to display the error message
        }

        // Access form data
        const { productName, price, date } = req.body;
        const imagePath = req.file.path;

        const newProduct = await products_db.create({
            name: productName,
            price: price,
            date: date,
            image: imagePath // Save the image path to the database
        });

        await newProduct.save();

        // Set success message in session
        req.session.successMessage = 'Product added successfully';

        // Redirect to admin/top3 page
        res.redirect('/admin/top3');
    } catch (error) {
        // Handle error
        console.error('Error adding product:', error);
        res.status(500).send('Internal Server Error'); // Example error handling
    }
})

post_router.post('/submitShops', upload.single('image'), async (req, res) => {
    try {
        // Check if there are already three products
        const shopsCount = await shops_db.countDocuments({});
        if (shopsCount >= 20) {
            // Set error message in session
            req.session.errorMessage = 'Only 20 products are allowed';
            return res.redirect('/admin/shop'); // Redirect to admin/top3 page to display the error message
        }

        // Access form data
        const { productName, price, date , category} = req.body;
        const imagePath = req.file.path;

        const newshops = await shops_db.create({
            name: productName,
            price: price,
            date: date,
            image: imagePath, // Save the image path to the database
            category: category
        });

        await newshops.save();

        // Set success message in session
        req.session.successMessage = 'Shops added successfully';

        // Redirect to admin/top3 page
        res.redirect('/admin/shops');
    } catch (error) {
        // Handle error
        console.error('Error adding product:', error);
        res.status(500).send('Internal Server Error'); // Example error handling
    }
})

module.exports = post_router;