const mongoose= require("mongoose")

const product_schema= mongoose.Schema({
    name: "String",
    price: "Number",
    date:"String",
    image: String // Store the image path as a string
})

const products_db= mongoose.model("products_db", product_schema)


module.exports = products_db