const mongoose = require("mongoose")

const dataSchema = mongoose.Schema({

    categoryName: {type: String, unique: true, required: true},
    categoryImg: {type: String, unique: true}
    
}, {timestamps: true, versonKey: true})

const categoryModel = mongoose.model("categories", dataSchema)
module.exports = categoryModel;