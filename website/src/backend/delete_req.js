const express = require('express');
const delet_req = express.Router();
const products_db = require('./models/products.js')
const fs = require('fs');
const path = require('path')
// const {uploadsPath} = require("./multer.js") 



const uploadsPath = path.join(__dirname,'../../');
// console.log(uploadsPath)
// delet_req.use('/', multer_router)

delet_req.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        // Find the product by ID
        const product = await products_db.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete the associated image file
        const imagePath = path.join(uploadsPath, product.image);
        fs.unlinkSync(imagePath); // Delete the file synchronously

        // Delete the product from the database
        await products_db.findByIdAndDelete(productId);

        res.sendStatus(200); // Send success response
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Send error response
    }
});



module.exports = delet_req