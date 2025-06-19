const express = require("express")
const { requireAuth } = require("../middleware/auth")
const { sampleProducts } = require("../controllers/productController")
const { seedOrders } = require("../utils/seedData")
const router = express.Router()

// GET / - Homepage
router.get("/", (req, res) => {
  res.render("index", {
    title: "Seasalt Cornwall - Home",
    products: sampleProducts,
    pageClass: "home-page",
  })
})

// GET /about
router.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us - Seasalt Cornwall",
    pageClass: "about-page",
  })
})

// GET /profile - Protected route
router.get("/profile", requireAuth, async (req, res) => {
  try {
    // Seed sample orders for new users (for demonstration)
    await seedOrders(req.session.user.id, req.session.user.email)

    res.render("profile", {
      title: "My Profile - Seasalt Cornwall",
      pageClass: "profile-page",
    })
  } catch (error) {
    console.error("Profile page error:", error)
    res.render("profile", {
      title: "My Profile - Seasalt Cornwall",
      pageClass: "profile-page",
    })
  }
})

// POST /newsletter - Newsletter signup
router.post("/newsletter", (req, res) => {
  const { email } = req.body

  if (!email) {
    req.flash("error", "Please provide a valid email address")
    return res.redirect("/#newsletter")
  }

  // In a real application, you would save this to a database
  console.log("📧 Newsletter signup:", email)

  req.flash("success", "Thank you for subscribing to our newsletter!")
  res.redirect("/#newsletter")
})

// GET /admin-access - Admin access helper route
router.get("/admin-access", (req, res) => {
  if (req.session && req.session.user) {
    res.redirect("/admin")
  } else {
    req.flash("error", "Please log in to access the admin panel")
    res.redirect("/login")
  }
})

module.exports = router
