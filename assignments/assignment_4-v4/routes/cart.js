const express = require("express")
const { addToCart, viewCart, updateCartItem, removeFromCart, getCartCount } = require("../controllers/cartController")

const router = express.Router()

// Cart routes
router.post("/cart/add", addToCart)
router.get("/cart", viewCart)
router.post("/cart/update", updateCartItem)
router.post("/cart/remove", removeFromCart)
router.get("/cart/count", getCartCount)

module.exports = router
