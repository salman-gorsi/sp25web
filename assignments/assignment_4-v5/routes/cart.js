const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController")

// Get cart
router.get("/", cartController.getCart)

// Add to cart
router.post("/add", cartController.addToCart)

// Update cart item quantity
router.post("/update", cartController.updateCart)

// Remove from cart
router.post("/remove", cartController.removeFromCart)

// Get cart count (for AJAX)
router.get("/count", cartController.getCartCount)

// Clear cart
router.post("/clear", cartController.clearCart)

module.exports = router
