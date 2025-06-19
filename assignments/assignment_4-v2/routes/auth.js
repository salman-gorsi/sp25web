const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const { redirectIfLoggedIn } = require("../middleware/auth")

// Login page
router.get("/login", redirectIfLoggedIn, (req, res) => {
  res.render("auth/login", {
    title: "Login - Seasalt Cornwall",
    pageClass: "auth-page",
    layout: "layouts/auth",
  })
})

// Login POST
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      req.flash("error", "Invalid email or password")
      return res.redirect("/login")
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      req.flash("error", "Invalid email or password")
      return res.redirect("/login")
    }

    // Set session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin || false,
    }

    req.flash("success", `Welcome back, ${user.name}!`)
    res.redirect("/")
  } catch (error) {
    console.error("Login error:", error)
    req.flash("error", "An error occurred during login")
    res.redirect("/login")
  }
})

// Register page
router.get("/register", redirectIfLoggedIn, (req, res) => {
  res.render("auth/register", {
    title: "Register - Seasalt Cornwall",
    pageClass: "auth-page",
    layout: "layouts/auth",
  })
})

// Register POST
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body

    // Validation
    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match")
      return res.redirect("/register")
    }

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      req.flash("error", "Email already registered")
      return res.redirect("/register")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    })

    await user.save()

    // Set session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin || false,
    }

    req.flash("success", `Welcome to Seasalt Cornwall, ${user.name}!`)
    res.redirect("/")
  } catch (error) {
    console.error("Registration error:", error)
    req.flash("error", "An error occurred during registration")
    res.redirect("/register")
  }
})

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err)
    }
    res.redirect("/")
  })
})

module.exports = router
