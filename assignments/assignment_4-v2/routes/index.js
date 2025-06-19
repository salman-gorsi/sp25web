const express = require("express")
const router = express.Router()
const Product = require("../models/Product")

// Home page
router.get("/", async (req, res) => {
  try {
    // Get featured products for homepage
    const featuredProducts = await Product.find({ featured: true }).limit(6)

    res.render("index", {
      title: "Seasalt Cornwall - Coastal Clothing & Lifestyle",
      pageClass: "home-page",
      featuredProducts: featuredProducts || [],
    })
  } catch (error) {
    console.error("Error loading homepage:", error)
    res.render("index", {
      title: "Seasalt Cornwall - Coastal Clothing & Lifestyle",
      pageClass: "home-page",
      featuredProducts: [],
    })
  }
})

// About page
router.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us - Seasalt Cornwall",
    pageClass: "about-page",
  })
})

module.exports = router
