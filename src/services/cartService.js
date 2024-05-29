const cartModel = require("../models/cartModel")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

const SaveCartListService = async (req) => {
    try{

        let user_id = req.headers['user_id']
        let reqBody = req.body;
        reqBody.userID = user_id;
        await cartModel.create(reqBody)
        return {status: 'success', message: 'Cart list save success'}

    }catch(e){
        return {status: 'failed', data: e.toString()}
    }
}


const RemoveCartListService = async (req) => {
    try{

        let user_id = req.headers['user_id']
        let reqBody = req.body;
        reqBody.userID = user_id;
        await cartModel.deleteOne(reqBody)
        return {status: 'success', message: 'Cart list remove success'}

    }catch(e){
        return {status: 'failed', data: e.toString()}
    }
}


const CartListService = async (req) => {
    try{

        let user_id = new ObjectId(req.headers['user_id'])
        let matchStage = {$match: {userID: user_id}}

        let joinStageProduct = {$lookup: {from: "products", localField: "productID", foreignField: "_id", as: "product"}}
        let joinStageBrand = {$lookup: {from: "brands", localField: "product.brandID", foreignField: "_id", as: "brand"}}
        let joinStageCategory = {$lookup: {from: "categories", localField: "product.categoryID", foreignField: "_id", as: "category"}}

        let UnwindStageProduct = {$unwind: "$product"}
        let UnwindStageBrand = {$unwind: "$brand"}
        let UnwindStageCategory = {$unwind: "$category"}

        let projection = {
            $project: {
                "createdAt": 0,
                "updatedAt": 0,
                'product._id': 0,
                "product.brandID": 0,
                "product.categoryID": 0,
                "brand._id": 0,
                "category._id": 0

            }
        }

        let data = await cartModel.aggregate([

            matchStage,
            joinStageProduct,
            joinStageBrand,
            joinStageCategory,
            UnwindStageProduct,
            UnwindStageBrand,
            UnwindStageCategory,
            projection

        ])

        return {status: 'success', data: data}
    }catch(e){
        return {status: 'failed', data: e.toString()}
    }
}


module.exports = {
    SaveCartListService,
    RemoveCartListService,
    CartListService

}