const Cart = require("../models/Cart")
const Product = require("../models/Product")

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body

    // Find the product
    const product = await Product.findById(productId)
    if (!product) {
      req.flash("error", "Product not found")
      return res.redirect("/products")
    }

    // Find or create cart
    let cart
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id })
    } else {
      cart = await Cart.findOne({ sessionId: req.sessionID })
    }

    if (!cart) {
      cart = new Cart({
        user: req.user ? req.user._id : null,
        sessionId: req.user ? null : req.sessionID,
        items: [],
      })
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += Number.parseInt(quantity)
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity: Number.parseInt(quantity),
        price: product.price,
      })
    }

    await cart.save()
    req.flash("success", "Item added to cart successfully!")
    res.redirect("/products")
  } catch (error) {
    console.error("Add to cart error:", error)
    req.flash("error", "Failed to add item to cart")
    res.redirect("/products")
  }
}

// View cart
const viewCart = async (req, res) => {
  try {
    let cart
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id }).populate("items.product")
    } else {
      cart = await Cart.findOne({ sessionId: req.sessionID }).populate("items.product")
    }

    if (!cart || cart.items.length === 0) {
      return res.render("cart/view", {
        title: "Shopping Cart - Seasalt Cornwall",
        pageClass: "cart-page",
        cart: null,
        items: [],
        totalAmount: 0,
      })
    }

    res.render("cart/view", {
      title: "Shopping Cart - Seasalt Cornwall",
      pageClass: "cart-page",
      cart,
      items: cart.items,
      totalAmount: cart.totalAmount,
    })
  } catch (error) {
    console.error("View cart error:", error)
    req.flash("error", "Failed to load cart")
    res.redirect("/")
  }
}

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body

    let cart
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id })
    } else {
      cart = await Cart.findOne({ sessionId: req.sessionID })
    }

    if (!cart) {
      return res.json({ success: false, message: "Cart not found" })
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

    if (itemIndex > -1) {
      if (Number.parseInt(quantity) <= 0) {
        cart.items.splice(itemIndex, 1)
      } else {
        cart.items[itemIndex].quantity = Number.parseInt(quantity)
      }
      await cart.save()
      res.json({ success: true, totalAmount: cart.totalAmount })
    } else {
      res.json({ success: false, message: "Item not found in cart" })
    }
  } catch (error) {
    console.error("Update cart error:", error)
    res.json({ success: false, message: "Failed to update cart" })
  }
}

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body

    let cart
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id })
    } else {
      cart = await Cart.findOne({ sessionId: req.sessionID })
    }

    if (!cart) {
      req.flash("error", "Cart not found")
      return res.redirect("/cart")
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId)

    await cart.save()
    req.flash("success", "Item removed from cart")
    res.redirect("/cart")
  } catch (error) {
    console.error("Remove from cart error:", error)
    req.flash("error", "Failed to remove item from cart")
    res.redirect("/cart")
  }
}

// Get cart count for header
const getCartCount = async (req, res) => {
  try {
    let cart
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id })
    } else {
      cart = await Cart.findOne({ sessionId: req.sessionID })
    }

    const count = cart ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0
    res.json({ count })
  } catch (error) {
    console.error("Get cart count error:", error)
    res.json({ count: 0 })
  }
}

module.exports = {
  addToCart,
  viewCart,
  updateCartItem,
  removeFromCart,
  getCartCount,
}
