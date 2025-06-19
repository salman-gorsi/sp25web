const express = require("express")
const User = require("../models/User")
const { redirectIfLoggedIn } = require("../middleware/auth")
const router = express.Router()

// GET /login
router.get("/login", redirectIfLoggedIn, (req, res) => {
  res.render("auth/login", {
    title: "Login - Seasalt Cornwall",
    layout: "layouts/auth",
    pageClass: "auth-page",
  })
})

// POST /login
router.post("/login", redirectIfLoggedIn, async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      req.flash("error", "Please provide email and password")
      return res.redirect("/login")
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      req.flash("error", "Invalid email or password")
      return res.redirect("/login")
    }

    // Check password
    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
      req.flash("error", "Invalid email or password")
      return res.redirect("/login")
    }

    // Create session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    }

    req.flash("success", `Welcome back, ${user.name}!`)
    res.redirect("/")
  } catch (error) {
    console.error("Login error:", error)
    req.flash("error", "An error occurred during login. Please try again.")
    res.redirect("/login")
  }
})

// GET /register
router.get("/register", redirectIfLoggedIn, (req, res) => {
  res.render("auth/register", {
    title: "Register - Seasalt Cornwall",
    layout: "layouts/auth",
    pageClass: "auth-page",
  })
})

// POST /register
router.post("/register", redirectIfLoggedIn, async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body

    if (!name || !email || !password || !confirmPassword) {
      req.flash("error", "Please fill in all fields")
      return res.redirect("/register")
    }

    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match")
      return res.redirect("/register")
    }

    if (password.length < 6) {
      req.flash("error", "Password must be at least 6 characters long")
      return res.redirect("/register")
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      req.flash("error", "Email already registered")
      return res.redirect("/register")
    }

    // Create new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password,
    })

    await newUser.save()

    // Create session
    req.session.user = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    }

    req.flash("success", `Welcome to Seasalt Cornwall, ${newUser.name}!`)
    res.redirect("/")
  } catch (error) {
    console.error("Registration error:", error)
    if (error.code === 11000) {
      req.flash("error", "Email already registered")
    } else {
      req.flash("error", "An error occurred during registration. Please try again.")
    }
    res.redirect("/register")
  }
})

// GET /logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err)
      req.flash("error", "Error logging out")
      return res.redirect("/")
    }
    res.clearCookie("connect.sid") // Clear the session cookie
    res.redirect("/login")
  })
})

module.exports = router
