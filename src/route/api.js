const express = require("express")
const router = express.Router()


// CONTROLLERS
const productController = require("../controllers/ProductController")
const usersController = require('../controllers/usersController')
const authVerification = require("../middleware/authVerification")
const wishController = require("../controllers/wishController")
const cartController = require("../controllers/cartController")


// REST API || products
router.get('/ProductBrandList', productController.ProductBrandList)
router.get('/ProductCategoryList', productController.ProductCategoryList)
router.get('/ProductSliderList', productController.ProductSliderList)
router.get('/ProductListByBrand/:brandID', productController.ProductListByBrand)
router.get('/ProductListByCategory/:CategoryID', productController.ProductListByCategory)
router.get('/ProductListBySmilier/:CategoryID', productController.ProductListBySmilier)
router.get('/ProductListByKeyword/:Keyword', productController.ProductListByKeyword)
router.get('/ProductListByRemark/:Remark', productController.ProductListByRemark)
router.get('/ProductDetails/:productID', productController.ProductDetails)
router.get('/ProductReviewList/:productID', productController.ProductReviewList)

// USER
router.get('/UserOTP/:email', usersController.UserOTP)
router.get('/VerifyLogin/:email/:otp', usersController.VerifyLogin)
router.get('/UserLogout',authVerification, usersController.UserLogout)
router.post('/CreateProfile', authVerification, usersController.CreateProfile)
router.post('/UpdateProfile', authVerification, usersController.CreateProfile)
router.get('/ReadProfile', authVerification, usersController.ReadProfile)


// WISH
router.post('/SaveWishList', authVerification, wishController.SaveWishList)
router.get('/RemoveWishList', authVerification, wishController.RemoveWishList)
router.get('/WishList', authVerification, wishController.WishList)

// CART
router.post('/SaveCartList', authVerification, cartController.SaveCartList)
router.get('/RemoveCartList', authVerification, cartController.RemoveCartList)
router.get('/CartList', authVerification, cartController.CartList)



//  EXPORT ROUTER
module.exports = router;