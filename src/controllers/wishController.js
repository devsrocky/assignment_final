const {SaveWishListService, RemoveWishListService, WishListService} = require("../services/wishService")

exports.SaveWishList = async (req, res) => {
    let data = await SaveWishListService(req)
    res.status(201).json(data)
}

exports.RemoveWishList = async (req, res) => {
    let data = await RemoveWishListService(req)
    res.status(201).json(data)
}

exports.WishList = async (req, res) => {
    let data = await WishListService(req)
    res.status(201).json(data)
}