require("dotenv").config()

const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const path = require("path")

// Import configuration
const sessionConfig = require("./config/session")

// Import database connection and models
const connectDB = require("./config/database")
const User = require("./models/User")
const Order = require("./models/Order")

// Import middleware
const { addUserToLocals } = require("./middleware/auth")
const { addAdminToLocals } = require("./middleware/admin")
const { setupFlashMessages, logMissingFiles } = require("./middleware/general")

// Import routes
const indexRoutes = require("./routes/index")
const authRoutes = require("./routes/auth")
const productRoutes = require("./routes/products")
const orderRoutes = require("./routes/orders")
const adminRoutes = require("./routes/admin")
const cartRoutes = require("./routes/cart")
const checkoutRoutes = require("./routes/checkout")

// Import utilities
const { seedOrders } = require("./utils/seedData")
const { createAdminUser } = require("./utils/createAdmin")
const { seedProducts } = require("./utils/seedProducts")

const app = express()
const PORT = process.env.PORT || 3000

// Trust proxy (important for production)
app.set("trust proxy", 1)

// Connect to MongoDB
connectDB()

// Create admin user if it doesn't exist
createAdminUser()

// Seed sample products if database is empty
seedProducts()

// Sample product data (unchanged)
const products = {
  featured: [
    {
      id: 1,
      name: "Dresses",
      image: "/assets/dresses.avif",
      category: "dresses",
      description: "Beautiful dresses for every occasion",
    },
    {
      id: 2,
      name: "Tops",
      image: "/assets/tops.avif",
      category: "tops",
      description: "Stylish tops and blouses",
    },
    {
      id: 3,
      name: "Knitwear",
      image: "/assets/knitwear.avif",
      category: "knitwear",
      description: "Cozy knitwear collection",
    },
  ],
  carousel: [
    {
      id: 1,
      title: "HOLIDAY SHOP",
      subtitle: "THE",
      image: "/assets/holiday-shop.avif",
      buttonText: "VIEW THE COLLECTION",
      link: "/products/holiday",
    },
    {
      id: 2,
      title: "Seasalt Linen",
      subtitle: "",
      image: "/assets/seasalt-linen.avif",
      buttonText: "SHOP NEW IN",
      link: "/products/linen",
    },
    {
      id: 3,
      title: "SEASALT MEN",
      subtitle: "",
      image: "/assets/seasalt-men.avif",
      buttonText: "SHOP MEN'S",
      link: "/products/mens",
    },
  ],
  categories: [
    { name: "Dresses", slug: "dresses" },
    { name: "Tops", slug: "tops" },
    { name: "Knitwear", slug: "knitwear" },
    { name: "Outerwear", slug: "outerwear" },
    { name: "Trousers", slug: "trousers" },
    { name: "Accessories", slug: "accessories" },
  ],
}

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

// Global middleware
app.use(setupFlashMessages)
app.use(addUserToLocals)
app.use(addAdminToLocals)
app.use(logMissingFiles)

// Routes
app.use("/", indexRoutes)
app.use("/", authRoutes)
app.use("/", productRoutes)
app.use("/", orderRoutes)
app.use("/", adminRoutes)
app.use("/", cartRoutes)
app.use("/", checkoutRoutes)

// 404 handler
app.use((req, res) => {
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
