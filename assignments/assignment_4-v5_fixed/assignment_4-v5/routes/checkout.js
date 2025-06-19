const express = require("express")
const { showCheckout, processOrder, showConfirmation } = require("../controllers/checkoutController")

const router = express.Router()

// Checkout routes
router.get("/checkout", showCheckout)
router.post("/checkout", processOrder)
router.get("/checkout/confirmation/:orderId", showConfirmation)

module.exports = router
