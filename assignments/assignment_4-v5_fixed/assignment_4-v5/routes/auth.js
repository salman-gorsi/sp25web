const express = require("express")
const { redirectIfLoggedIn } = require("../middleware/auth")
const { getLogin, postLogin, getRegister, postRegister, logout } = require("../controllers/authController")

const router = express.Router()

// Login routes
router.get("/login", redirectIfLoggedIn, getLogin)
router.post("/login", redirectIfLoggedIn, postLogin)

// Register routes
router.get("/register", redirectIfLoggedIn, getRegister)
router.post("/register", redirectIfLoggedIn, postRegister)

// Logout route
router.get("/logout", logout)

module.exports = router
