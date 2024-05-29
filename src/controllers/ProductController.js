const {brandListService, categoryService, sliderService, productsByBrandService, ProductsByCategoryService,ProductsBySmilierService, ProductByKeywordService, ProductsByRemarkService, ProductDetailsService, ProductReviewService} = require('../services/productService')

exports.ProductBrandList = async (req, res) => {
    let data = await brandListService()
    res.status(200).json(data)
}

exports.ProductCategoryList = async (req, res) => {
    let data = await categoryService();
    res.status(200).json(data)
}

exports.ProductSliderList = async (req, res) => {
    let data = await sliderService();
    res.status(200).json(data)
}

exports.ProductListByBrand = async (req, res) => {
    let data = await productsByBrandService(req)
    res.status(200).json(data)
}

exports.ProductListByCategory = async (req, res) => {
    let data = await ProductsByCategoryService(req)
    res.status(200).json(data)
}

exports.ProductListBySmilier = async (req, res) => {
    let data = await ProductsBySmilierService(req)
    res.status(200).json(data)
}

exports.ProductListByKeyword = async (req, res) => {
    let data = await ProductByKeywordService(req)
    res.status(200).json(data)
}

exports.ProductListByRemark = async (req, res) => {
    let data = await ProductsByRemarkService(req)
    res.status(200).json(data)
}

exports.ProductDetails = async (req, res) => {
    let data = await ProductDetailsService(req)
    res.status(200).json(data)
}

exports.ProductReviewList = async (req, res) => {
    let data = await ProductReviewService(req)
    res.status(200).json(data)
}
