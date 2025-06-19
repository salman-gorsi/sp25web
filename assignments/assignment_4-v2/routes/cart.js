const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController")

// Cart routes
router.get("/", cartController.getCart)
router.post("/add", cartController.addToCart)
router.post("/update", cartController.updateCartItem)
router.post("/remove", cartController.removeFromCart)

// Checkout routes
router.get("/checkout", cartController.getCheckout)
router.post("/checkout/place-order", cartController.placeOrder)

// Order confirmation
router.get("/order-confirmation/:orderId", cartController.getOrderConfirmation)

module.exports = router
