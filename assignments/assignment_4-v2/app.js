require("dotenv").config()

const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const path = require("path")

// Import configuration
const sessionConfig = require("./config/session")

// Import database connection
const connectDB = require("./config/database")

// Import middleware
const { addUserToLocals } = require("./middleware/auth")
const { addAdminToLocals } = require("./middleware/admin")
const { addCartToLocals } = require("./middleware/cart")
const { setupFlashMessages, logMissingFiles, setDefaultLocals } = require("./middleware/general")

// Import routes
const indexRoutes = require("./routes/index")
const authRoutes = require("./routes/auth")
const productRoutes = require("./routes/products")
const orderRoutes = require("./routes/orders")
const cartRoutes = require("./routes/cart")
const adminRoutes = require("./routes/admin")

// Import utilities
const { createAdminUser } = require("./utils/createAdmin")
const { seedProducts } = require("./utils/seedProducts")

const app = express()

// Trust proxy (important for production)
app.set("trust proxy", 1)

// Connect to MongoDB
connectDB()

// Create admin user if it doesn't exist
createAdminUser()

// Seed sample products if database is empty
seedProducts()

// Static files middleware
app.use(express.static(path.join(__dirname, "public")))
app.use("/assets", express.static(path.join(__dirname, "assignment_2/assets")))

// Body parsing middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Session configuration
app.use(sessionConfig)

// EJS configuration
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(expressLayouts)
app.set("layout", "layouts/main")

// Global middleware - ORDER MATTERS!
app.use(setupFlashMessages)
app.use(addUserToLocals)
app.use(addAdminToLocals)
app.use(addCartToLocals)
app.use(setDefaultLocals) // This ensures all variables are defined
app.use(logMissingFiles)

// Routes
app.use("/", indexRoutes)
app.use("/auth", authRoutes)
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)
app.use("/cart", cartRoutes)
app.use("/checkout", cartRoutes)
app.use("/order-confirmation", cartRoutes)
app.use("/admin", adminRoutes)

// 404 handler
app.use((req, res) => {
  console.log("404 - Route not found:", req.method, req.url)
  res.status(404).render("404", {
    title: "Page Not Found - Seasalt Cornwall",
    pageClass: "error-page",
  })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Application Error:", err.stack)

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === "development"

  res.status(err.status || 500).render("500", {
    title: "Server Error - Seasalt Cornwall",
    pageClass: "error-page",
    error: isDevelopment ? err : null,
  })
})

module.exports = app
