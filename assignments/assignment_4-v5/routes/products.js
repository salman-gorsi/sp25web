const express = require("express")
const { getProducts, getProductById } = require("../controllers/productController")

const router = express.Router()

// GET /products
router.get("/products", getProducts)

// GET /products/:id
router.get("/products/:id", getProductById)

module.exports = router
