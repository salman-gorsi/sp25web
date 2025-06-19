const express = require("express")
const { requireAuth } = require("../middleware/auth")
const { getMyOrders, getOrderDetails } = require("../controllers/orderController")

const router = express.Router()

// All order routes require authentication
router.use(requireAuth)

// GET /my-orders
router.get("/my-orders", getMyOrders)

// GET /my-orders/:orderId
router.get("/my-orders/:orderId", getOrderDetails)

module.exports = router
