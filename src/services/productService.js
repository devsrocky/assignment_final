const brandModel = require("../models/brandModel")
const categoryModel = require("../models/categoryModel")
const sliderModel = require("../models/sliderModel")
const productModel = require("../models/productModel")
const reviewsModel = require("../models/reviewsModel")

const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

const brandListService = async () => {
    try{
        let data = await brandModel.find();
        return {status: 'success', data: data}
    }catch(e){
        return {status: 'failed', data: e.toString()}
    }
}

const categoryService = async () => {
    try{
        let data = await categoryModel.find();
        return {status: 'success', data: data}
    }catch(e){
        return {status: 'success', data: e.toString()}
    }
}

const sliderService = async () => {
    try{
        let data = await sliderModel.find();
        return {status: 'success', data: data}
    }catch(e){
        return {status: 'failed', data: e.toString()}
    }
}


const productsByBrandService = async (req) => {
    try{

        let brandID = new ObjectId(req.params.brandID)
        let matchStage = {$match: {brandID:brandID}}

        let joinStageBrand = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}}
        let joinStageCategory = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}}

        let unwindBrand = {$unwind: "$brand"}
        let unwindCategory = {$unwind: "$category"}

        let projection = {
            $project: {
                "categoryID":0,
                "brandID":0,
                "brand._id": 0,
                "category._id": 0
            }
        }
        let data = await productModel.aggregate([
            matchStage,
            joinStageBrand,
            joinStageCategory,
            unwindBrand,
            unwindCategory,
            projection
        ])
        return {status: 'success', data: data}
    }catch(e){
        return {status: 'failed', data: e.toString()}
    }
}

const ProductsByCategoryService = async (req, res) => {
    try{

        let CategoryID = new ObjectId(req.params.CategoryID);
        let matchStage = {$match: {categoryID:CategoryID}}

        let joinStageBrand = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}}
        let joinStageCategory = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}}
        let unwindBrand = {$unwind: "$brand"}
        let unwindCategory = {$unwind: "$category"}

        let projection = {
            $project: {
                "categoryID":0, "brandID": 0, "brand._id":0, "category._id":0
            }
        }

        let data = await productModel.aggregate([
            matchStage,
            joinStageBrand,
            joinStageCategory,
            unwindBrand,
            unwindCategory,
            projection
        ])
        return {status: 'success', data: data}

    }catch(e){
        return {status: 'failed', data: e.toString()}
    }
}


const ProductsBySmilierService = async (req) => {
    try{

        let CategoryID = new ObjectId(req.params.CategoryID)
        let matchStage = {$match: {categoryID:CategoryID}}
        let limitStage = {$limit: 10}

        let joinStageBrand = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}}
        let joinStageCategory = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}}
        let unwindBrand = {$unwind: "$brand"}
        let unwindCategory = {$unwind: "$category"}

        let projection = {
            $project: {
                "categoryID":0,
                "brandID": 0,
                "brand._id": 0,
                "category._id": 0
            }
        }
        let data = await productModel.aggregate([
            matchStage,
            limitStage,
            joinStageBrand,
            joinStageCategory,
            unwindBrand,
            unwindCategory,
            projection
        ])
        return {status: 'success', data: data}
    }catch(e){
        return {status: 'failed', data:e.toString()}
    }
}


const ProductByKeywordService = async (req) => {
    try{

        let searchRegex = {"$regex": req.params.Keyword, "$options": "i"}
        let searchParams = [{title: searchRegex}, {shortDes: searchRegex}];
        let searchQuery = {$or: searchParams}
        let matchStage = {$match: searchQuery}

        let joinStageBrand = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}}
        let joinStageCategory = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}}
        let unwindBrand = {$unwind: "$brand"}
        let unwindCategory = {$unwind: "$category"}
        let projection = {
            $project: {
                "categoryID":0,
                "brandID":0,
                "brand._id":0,
                "category._id":0
            }
        }
        let data = await productModel.aggregate([
            matchStage,
            joinStageBrand,
            joinStageCategory,
            unwindBrand,
            unwindCategory,
            projection
        ])
        return {status: 'success', data: data}
    }catch(e){
        return {status: 'failed', data:e.toString()}
    }
}


const ProductsByRemarkService = async (req) => {

    try{

        let Remark = req.params.Remark;
        let matchStage = {$match: {remark: Remark}}

        let joinStageBrand = {$lookup: {from: "brands", localField: 'brandID', foreignField: "_id", as: "brand"}}
        let joinStageCategory = {$lookup: {from: "categories", localField: 'categoryID', foreignField: "_id", as: "category"}}
        let unwindBrand = {$unwind: "$brand"}
        let unwindCategory = {$unwind: "$category"}

        let projection = {
            $project: {
                "brandID":0,
                "categoryID":0,
                "brand._id":0,
                "category._id":0,
            }
        }

        let data = await productModel.aggregate([
            matchStage,
            joinStageBrand,
            joinStageCategory,
            unwindBrand,
            unwindCategory,
            projection
        ])
        return {status: 'success', data: data}
    }catch(e){
        return {status: 'failed', data: e.toString()}
    }
}


const ProductDetailsService = async (req) => {
    try{

        let productID = new ObjectId(req.params.productID)
        let matchStage = {$match: {_id: productID}}

        let joinStageBrand = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}}
        let joinStageCategory = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}}
        let joinStageDetails = {$lookup: {from: "details", localField: "_id", foreignField: "productID", as: "details"}}

        let unwindBrand = {$unwind: "$brand"}
        let unwindCategory = {$unwind: "$category"}
        let unwindDetails = {$unwind: "$details"}

        let projection = {
            $project: {
                "brand._id": 0,
                "category._id": 0,
                "brandID": 0,
                "categoryID": 0
            }
        }

        let data = await productModel.aggregate([
            matchStage,
            joinStageBrand,
            joinStageCategory,
            joinStageDetails,
            unwindBrand,
            unwindCategory,
            unwindDetails,
            projection
        ])

        return {status: 'success', data: data}
    }catch(e){
        return {status: 'failed', data: e.toString()}
    }
}


const ProductReviewService = async (req) => {
    try{

        let productID = new ObjectId(req.params.productID)
        let matchStage = {$match: {productID:productID}}

        let joinStageProfile = {$lookup: {from: "profiles", localField: "userID", foreignField: "userID", as: "profile"}}
        let unwindProfile = {$unwind: "$profile"}

        let projection = {
            $project: {
                "des": 1,
                "rating": 1,
                "profile.cus_name":1
            }
        }

        let data = await reviewsModel.aggregate([
            matchStage,
            joinStageProfile,
            unwindProfile,
            projection
        ])
        return {status: 'success', data: data}
    }catch(e){
        return {status: 'failed', data: e.toString()}
    }
}





module.exports = {
    brandListService,
    categoryService,
    sliderService,
    productsByBrandService,
    ProductsByCategoryService,
    ProductsBySmilierService,
    ProductByKeywordService,
    ProductsByRemarkService,
    ProductDetailsService,
    ProductReviewService
    
}