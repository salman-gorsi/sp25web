const Product = require("../models/Product")
const Order = require("../models/Order")
const User = require("../models/User")

// GET /admin
const getDashboard = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments()
    const totalOrders = await Order.countDocuments()
    const totalUsers = await User.countDocuments()
    const recentOrders = await Order.find().populate("userId", "name email").sort({ createdAt: -1 }).limit(5).lean()

    const stats = {
      totalProducts,
      totalOrders,
      totalUsers,
      recentOrders: recentOrders.map((order) => ({
        ...order,
        createdAtFormatted: order.createdAt.toLocaleDateString("en-GB"),
        totalAmountFormatted: `£${order.totalAmount.toFixed(2)}`,
      })),
    }

    res.render("admin/dashboard", {
      title: "Admin Dashboard - Seasalt Cornwall",
      stats,
      pageClass: "admin-page",
      layout: "layouts/admin",
    })
  } catch (error) {
    console.error("Admin dashboard error:", error)
    req.flash("error", "Error loading dashboard")
    res.redirect("/")
  }
}

// GET /admin/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean()

    const formattedProducts = products.map((product) => ({
      ...product,
      priceFormatted: `£${product.price.toFixed(2)}`,
      createdAtFormatted: product.createdAt.toLocaleDateString("en-GB"),
    }))

    res.render("admin/products/list", {
      title: "Manage Products - Admin",
      products: formattedProducts,
      pageClass: "admin-page",
      layout: "layouts/admin",
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    req.flash("error", "Error loading products")
    res.redirect("/admin")
  }
}

// GET /admin/products/add
const getAddProduct = (req, res) => {
  res.render("admin/products/add", {
    title: "Add Product - Admin",
    pageClass: "admin-page",
    layout: "layouts/admin",
  })
}

// POST /admin/products/add
const postAddProduct = async (req, res) => {
  try {
    const { title, description, price, imageUrl, category, inStock, featured } = req.body

    if (!title || !description || !price || !imageUrl || !category) {
      req.flash("error", "Please fill in all required fields")
      return res.redirect("/admin/products/add")
    }

    const newProduct = new Product({
      title: title.trim(),
      description: description.trim(),
      price: Number.parseFloat(price),
      imageUrl: imageUrl.trim(),
      category,
      inStock: inStock === "on",
      featured: featured === "on",
    })

    await newProduct.save()
    req.flash("success", "Product added successfully!")
    res.redirect("/admin/products")
  } catch (error) {
    console.error("Error adding product:", error)
    req.flash("error", "Error adding product. Please try again.")
    res.redirect("/admin/products/add")
  }
}

// GET /admin/products/edit/:id
const getEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean()

    if (!product) {
      req.flash("error", "Product not found")
      return res.redirect("/admin/products")
    }

    res.render("admin/products/edit", {
      title: "Edit Product - Admin",
      product,
      pageClass: "admin-page",
      layout: "layouts/admin",
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    req.flash("error", "Error loading product")
    res.redirect("/admin/products")
  }
}

// POST /admin/products/edit/:id
const postEditProduct = async (req, res) => {
  try {
    const { title, description, price, imageUrl, category, inStock, featured } = req.body

    if (!title || !description || !price || !imageUrl || !category) {
      req.flash("error", "Please fill in all required fields")
      return res.redirect(`/admin/products/edit/${req.params.id}`)
    }

    await Product.findByIdAndUpdate(req.params.id, {
      title: title.trim(),
      description: description.trim(),
      price: Number.parseFloat(price),
      imageUrl: imageUrl.trim(),
      category,
      inStock: inStock === "on",
      featured: featured === "on",
      updatedAt: Date.now(),
    })

    req.flash("success", "Product updated successfully!")
    res.redirect("/admin/products")
  } catch (error) {
    console.error("Error updating product:", error)
    req.flash("error", "Error updating product. Please try again.")
    res.redirect(`/admin/products/edit/${req.params.id}`)
  }
}

// POST /admin/products/delete/:id
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    req.flash("success", "Product deleted successfully!")
    res.redirect("/admin/products")
  } catch (error) {
    console.error("Error deleting product:", error)
    req.flash("error", "Error deleting product")
    res.redirect("/admin/products")
  }
}

// GET /admin/orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email").sort({ createdAt: -1 }).lean()

    const formattedOrders = orders.map((order) => ({
      ...order,
      customerName: order.userId ? order.userId.name : "Unknown",
      customerEmail: order.userId ? order.userId.email : order.userEmail,
      createdAtFormatted: order.createdAt.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      totalAmountFormatted: `£${order.totalAmount.toFixed(2)}`,
      itemCount: order.items.length,
    }))

    res.render("admin/orders/list", {
      title: "Manage Orders - Admin",
      orders: formattedOrders,
      pageClass: "admin-page",
      layout: "layouts/admin",
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    req.flash("error", "Error loading orders")
    res.redirect("/admin")
  }
}

// GET /admin/orders/:id
const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId", "name email").lean()

    if (!order) {
      req.flash("error", "Order not found")
      return res.redirect("/admin/orders")
    }

    const formattedOrder = {
      ...order,
      customerName: order.userId ? order.userId.name : "Unknown",
      customerEmail: order.userId ? order.userId.email : order.userEmail,
      createdAtFormatted: order.createdAt.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      totalAmountFormatted: `£${order.totalAmount.toFixed(2)}`,
      items: order.items.map((item) => ({
        ...item,
        priceFormatted: `£${item.price.toFixed(2)}`,
        totalFormatted: `£${(item.price * item.quantity).toFixed(2)}`,
      })),
    }

    res.render("admin/orders/details", {
      title: `Order ${order.orderNumber} - Admin`,
      order: formattedOrder,
      pageClass: "admin-page",
      layout: "layouts/admin",
    })
  } catch (error) {
    console.error("Error fetching order:", error)
    req.flash("error", "Error loading order details")
    res.redirect("/admin/orders")
  }
}

// POST /admin/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body

    if (!["pending", "processing", "shipped", "delivered", "cancelled"].includes(status)) {
      req.flash("error", "Invalid status")
      return res.redirect(`/admin/orders/${req.params.id}`)
    }

    await Order.findByIdAndUpdate(req.params.id, {
      status,
      updatedAt: Date.now(),
    })

    req.flash("success", "Order status updated successfully!")
    res.redirect(`/admin/orders/${req.params.id}`)
  } catch (error) {
    console.error("Error updating order status:", error)
    req.flash("error", "Error updating order status")
    res.redirect(`/admin/orders/${req.params.id}`)
  }
}

module.exports = {
  getDashboard,
  getProducts,
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  deleteProduct,
  getOrders,
  getOrderDetails,
  updateOrderStatus,
}
