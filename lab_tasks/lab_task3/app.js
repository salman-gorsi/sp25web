require("dotenv").config()

const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const flash = require("connect-flash")
const path = require("path")

// Import database connection and models
const connectDB = require("./config/database")
const User = require("./models/User")
const Order = require("./models/Order")

// Import middleware
const { requireAuth, addUserToLocals } = require("./middleware/auth")

// Import routes
const authRoutes = require("./routes/auth")
const orderRoutes = require("./routes/orders")

// Import utilities
const { seedOrders } = require("./utils/seedData")

const app = express()
const PORT = process.env.PORT || 3000

// Connect to MongoDB
connectDB()

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

// Middleware
app.use(express.static(path.join(__dirname, "public")))
app.use("/assets", express.static(path.join(__dirname, "assignment_2/assets")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Session configuration with MongoDB store
app.use(
  session({
    secret: process.env.SESSION_SECRET || "seasalt-cornwall-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || "mongodb://localhost:27017/seasalt",
      touchAfter: 24 * 3600, // lazy session update
    }),
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
)

app.use(flash())

// EJS configuration
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(expressLayouts)
app.set("layout", "layouts/main")

// Global variables middleware
app.use(addUserToLocals)
app.use((req, res, next) => {
  res.locals.messages = req.flash()
  next()
})

// Add this middleware to check if files exist and log missing files
app.use((req, res, next) => {
  if (req.url.startsWith("/assets/") || req.url.startsWith("/css/") || req.url.startsWith("/js/")) {
    const filePath = path.join(__dirname, req.url.startsWith("/assets/") ? "assignment_2" : "public", req.url)
    const fs = require("fs")
    if (!fs.existsSync(filePath)) {
      console.log(`Missing file: ${filePath}`)
    }
  }
  next()
})

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Seasalt Cornwall - Home",
    products: products,
    pageClass: "home-page",
  })
})

app.get("/products", (req, res) => {
  const category = req.query.category
  let filteredProducts = products.featured

  if (category) {
    filteredProducts = products.featured.filter((p) => p.category === category)
  }

  res.render("products", {
    title: "Products - Seasalt Cornwall",
    products: filteredProducts,
    categories: products.categories,
    selectedCategory: category,
    pageClass: "products-page",
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us - Seasalt Cornwall",
    pageClass: "about-page",
  })
})

// Authentication routes
app.use("/", authRoutes)

// Order routes
app.use("/", orderRoutes)

// Protected routes
app.get("/profile", requireAuth, async (req, res) => {
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

// Newsletter signup
app.post("/newsletter", (req, res) => {
  const { email } = req.body

  if (!email) {
    req.flash("error", "Please provide a valid email address")
    return res.redirect("/#newsletter")
  }

  // In a real application, you would save this to a database
  console.log("Newsletter signup:", email)

  req.flash("success", "Thank you for subscribing to our newsletter!")
  res.redirect("/#newsletter")
})

// 404 handler
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found - Seasalt Cornwall",
    pageClass: "error-page",
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render("500", {
    title: "Server Error - Seasalt Cornwall",
    pageClass: "error-page",
  })
})

app.listen(PORT, () => {
  console.log(`Seasalt Cornwall server running on http://localhost:${PORT}`)
})
