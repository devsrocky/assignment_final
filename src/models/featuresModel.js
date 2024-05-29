const mongoose = require("mongoose")

const dataSchema = mongoose.Schema({

    name: {type: String},
    description: {type: String},
    img: {type: String}

}, {timestamps: true, versionKey: true})

const featuresModel = ("features", dataSchema)
module.exports = featuresModel;
