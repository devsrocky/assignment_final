const mongoose = require("mongoose")

const dataSchema = mongoose.Schema ({

    title: {type: String},
    short_des: {type: String},
    price: {type: String},
    image: {type: String},
    productID: {type: String}

}, {timestamps: true, versionKey: false})

const sliderModel = mongoose.model("sliders", dataSchema)
module.exports = sliderModel;