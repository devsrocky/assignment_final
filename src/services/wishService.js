const wishModel = require("../models/wishModel")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

const SaveWishListService = async (req) => {
    try{

        let user_id =  req.headers['user_id']
        let reqBody = req.body;
        reqBody.userID = user_id;
        await wishModel.updateOne(reqBody, {$set: reqBody}, {upsert: true})
        return {status: 'success', data: "Wishlist save success"}

    }catch(e){
        return {status: 'success', data: e.toString()}
    }
}


const RemoveWishListService = async (req) => {
    try{
        let user_id = req.headers['user_id']
        let reqBody = req.body;
        reqBody.userID = user_id;
        await wishModel.deleteOne(reqBody)
        return {status: 'success', data: 'Wish list remove success'}
    }catch(e){
        return {status: 'failed', data: e.toString()}
    }
}


const WishListService = async (req) => {
    try{

        let user_id = new ObjectId(req.headers['user_id'])
        let matchStage = {$match: {userID: user_id}}

        let joinStageProduct = {$lookup: {from: 'products', localField: 'productID', foreignField: '_id', as: 'product'}}
        let joinStageBrand = {$lookup: {from: 'brands', localField: 'product.brandID', foreignField: '_id', as: 'brand'}}
        let joinStageCategory = {$lookup: {from: 'categories', localField: 'product.categoryID', foreignField: '_id', as: 'category'}}

        let unwindProduct = {$unwind: "$product"}
        let unwindBrand = {$unwind: "$brand"}
        let unwindCategory = {$unwind: "$category"}

        let projection = {
            $project: {
                "_id":0,
                "createdAt":0,
                "updatedAt":0,
                "product.brandID":0,
                "product.categoryID":0,
                "brand._id":0,
                "category._id":0,

            }
        }

        let data = await wishModel.aggregate([
            matchStage,
            joinStageProduct,
            joinStageBrand,
            joinStageCategory,
            unwindProduct,
            unwindBrand,
            unwindCategory,
            projection
        ])

        return {status: 'success', data: data}

    }catch(e){
        return {status: 'failed', data: e.toString()}
    }
}


module.exports = {
    SaveWishListService,
    RemoveWishListService,
    WishListService
}