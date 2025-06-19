const express = require("express")
const { requireAdmin } = require("../middleware/admin")
const {
  getDashboard,
  getProducts,
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  deleteProduct,
  getOrders,
  getOrderDetails,
  updateOrderStatus,
} = require("../controllers/adminController")

const router = express.Router()

// All admin routes require admin authentication
router.use(requireAdmin)

// Dashboard
router.get("/", getDashboard)

// Products Management
router.get("/products", getProducts)
router.get("/products/add", getAddProduct)
router.post("/products/add", postAddProduct)
router.get("/products/edit/:id", getEditProduct)
router.post("/products/edit/:id", postEditProduct)
router.post("/products/delete/:id", deleteProduct)

// Orders Management
router.get("/orders", getOrders)
router.get("/orders/:id", getOrderDetails)
router.post("/orders/:id/status", updateOrderStatus)

module.exports = router
