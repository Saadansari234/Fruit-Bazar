const express = require('express');
const multer_router = express.Router();
const multer = require('multer');
const path = require("path");


// multer library for file upload
// Serve static files from the uploads folder
const uploadsPath = path.join(__dirname,'../../uploads');

multer_router.use('/uploads', express.static(uploadsPath));
console.log(uploadsPath)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Uploads folder where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});

const upload = multer({ storage: storage });


module.exports = {upload, multer_router, uploadsPath};