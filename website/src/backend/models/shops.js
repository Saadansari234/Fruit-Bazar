const mongoose= require("mongoose")

const shops_schema= mongoose.Schema({
    name: "String",
    price: "Number",
    date:"String",
    image: String, // Store the image path as a string
    category:"String"
})

const shops_db= mongoose.model("shops_db", shops_schema)


module.exports = shops_db