const mongoose = require("mongoose")
const dataSchema = mongoose.Schema({

    title: {type: String, required: true},
    short_des: {type: String, required: true},
    price: {type: String, required: true},
    discount: {type: Boolean, required: true},
    discount_price: {type: String, required: true},
    image: {type: String, required: true},
    stock: {type: Boolean, required: true},
    star: {type: String, required: true},
    remark: {type: String, required: true},
    categoryID: {type: mongoose.Schema.Types.ObjectId, required: true},
    brandID: {type: mongoose.Schema.Types.ObjectId, required: true}


}, {timestamps: true, versionKey: false})

const productModel = mongoose.model("products", dataSchema)
module.exports = productModel;