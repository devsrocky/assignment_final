const mongoose = require("mongoose")

const dataSchema = mongoose.Schema({

    userID: {type: mongoose.Schema.Types.ObjectId, required: true},
    productID: {type: mongoose.Schema.Types.ObjectId, required: true},
    des: {type: String, required: true},
    rating: {type: String, required: true},

}, {timestamps: true, versionKey: false})

const reviewsModel = mongoose.model("reviews", dataSchema)
module.exports = reviewsModel;