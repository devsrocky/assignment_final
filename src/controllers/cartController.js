const {SaveCartListService, RemoveCartListService, CartListService} = require("../services/cartService")

exports.SaveCartList = async (req, res) => {
    let data = await SaveCartListService(req)
    res.status(201).json(data)
}

exports.RemoveCartList = async (req, res) => {

    let data = await RemoveCartListService(req)
    res.status(200).json(data)
}

exports.CartList = async (req, res) => {

    let data = await CartListService(req)
    res.status(200).json(data)
}