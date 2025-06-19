const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")
const flash = require("connect-flash")
const bcrypt = require("bcryptjs")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3000

// In-memory user storage (replace with database in production)
const users = []

// Sample product data
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
app.use(express.static("public"))
app.use("/assets", express.static("assignment_2/assets"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Session configuration
app.use(
  session({
    secret: "seasalt-cornwall-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  }),
)

app.use(flash())

// EJS configuration
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(expressLayouts)
app.set("layout", "layouts/main")

// Global variables middleware
app.use((req, res, next) => {
  res.locals.user = req.session.user || null
  res.locals.isAuthenticated = !!req.session.user
  res.locals.messages = req.flash()
  next()
})

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    req.flash("error", "Please log in to access this page")
    res.redirect("/login")
  }
}

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
app.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/")
  }
  res.render("auth/login", {
    title: "Login - Seasalt Cornwall",
    layout: "layouts/auth",
    pageClass: "auth-page",
  })
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    req.flash("error", "Please provide email and password")
    return res.redirect("/login")
  }

  const user = users.find((u) => u.email === email)

  if (!user) {
    req.flash("error", "Invalid email or password")
    return res.redirect("/login")
  }

  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    req.flash("error", "Invalid email or password")
    return res.redirect("/login")
  }

  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
  }

  req.flash("success", `Welcome back, ${user.name}!`)
  res.redirect("/")
})

app.get("/register", (req, res) => {
  if (req.session.user) {
    return res.redirect("/")
  }
  res.render("auth/register", {
    title: "Register - Seasalt Cornwall",
    layout: "layouts/auth",
    pageClass: "auth-page",
  })
})

app.post("/register", async (req, res) => {
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

  const existingUser = users.find((u) => u.email === email)
  if (existingUser) {
    req.flash("error", "Email already registered")
    return res.redirect("/register")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  }

  users.push(newUser)

  req.session.user = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  }

  req.flash("success", `Welcome to Seasalt Cornwall, ${name}!`)
  res.redirect("/")
})

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err)
    }
    res.redirect("/")
  })
})

// Protected routes
app.get("/profile", requireAuth, (req, res) => {
  res.render("profile", {
    title: "My Profile - Seasalt Cornwall",
    pageClass: "profile-page",
  })
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
