const Cart = require("../models/Cart")
const Product = require("../models/Product")

// Get cart
exports.getCart = async (req, res) => {
  try {
    let cart

    if (req.session.user) {
      // Logged in user
      cart = await Cart.findOne({ userId: req.session.user._id }).populate("items.product")
    } else {
      // Guest user - use session cart
      cart = req.session.cart || { items: [], totalAmount: 0 }

      // Populate product details for session cart
      if (cart.items && cart.items.length > 0) {
        for (const item of cart.items) {
          if (typeof item.product === "string") {
            item.product = await Product.findById(item.product)
          }
        }
      }
    }

    res.render("cart/view", {
      title: "Shopping Cart - Seasalt Cornwall",
      cart: cart,
      items: cart ? cart.items : [],
      totalAmount: cart ? cart.totalAmount : 0,
      isAuthenticated: !!req.session.user,
      user: req.session.user || null,
      isAdmin: req.session.user && req.session.user.role === "admin",
    })
  } catch (error) {
    console.error("Error getting cart:", error)
    req.flash("error", "Error loading cart")
    res.redirect("/products")
  }
}

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body
    const product = await Product.findById(productId)

    if (!product) {
      req.flash("error", "Product not found")
      return res.redirect("/products")
    }

    let cart

    if (req.session.user) {
      // Logged in user
      cart = await Cart.findOne({ userId: req.session.user._id })

      if (!cart) {
        cart = new Cart({
          userId: req.session.user._id,
          items: [],
          totalAmount: 0,
        })
      }

      // Check if product already in cart
      const existingItemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += Number.parseInt(quantity)
      } else {
        cart.items.push({
          product: productId,
          quantity: Number.parseInt(quantity),
          price: product.price,
        })
      }

      // Calculate total
      cart.totalAmount = cart.items.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)

      await cart.save()
    } else {
      // Guest user - use session
      if (!req.session.cart) {
        req.session.cart = { items: [], totalAmount: 0 }
      }

      cart = req.session.cart

      // Check if product already in cart
      const existingItemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += Number.parseInt(quantity)
      } else {
        cart.items.push({
          product: productId,
          quantity: Number.parseInt(quantity),
          price: product.price,
        })
      }

      // Calculate total
      cart.totalAmount = cart.items.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    }

    req.flash("success", `${product.name} added to cart!`)
    res.redirect("/products")
  } catch (error) {
    console.error("Error adding to cart:", error)
    req.flash("error", "Error adding item to cart")
    res.redirect("/products")
  }
}

// Update cart item quantity
exports.updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const newQuantity = Number.parseInt(quantity)

    if (newQuantity < 1) {
      return exports.removeFromCart(req, res)
    }

    let cart

    if (req.session.user) {
      cart = await Cart.findOne({ userId: req.session.user._id })
      if (cart) {
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

        if (itemIndex > -1) {
          cart.items[itemIndex].quantity = newQuantity

          // Recalculate total
          cart.totalAmount = cart.items.reduce((total, item) => {
            return total + item.price * item.quantity
          }, 0)

          await cart.save()
        }
      }
    } else {
      cart = req.session.cart
      if (cart) {
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

        if (itemIndex > -1) {
          cart.items[itemIndex].quantity = newQuantity

          // Recalculate total
          cart.totalAmount = cart.items.reduce((total, item) => {
            return total + item.price * item.quantity
          }, 0)
        }
      }
    }

    if (req.xhr || req.headers.accept.indexOf("json") > -1) {
      res.json({ success: true, totalAmount: cart.totalAmount })
    } else {
      req.flash("success", "Cart updated successfully")
      res.redirect("/cart")
    }
  } catch (error) {
    console.error("Error updating cart:", error)
    if (req.xhr || req.headers.accept.indexOf("json") > -1) {
      res.json({ success: false, error: "Error updating cart" })
    } else {
      req.flash("error", "Error updating cart")
      res.redirect("/cart")
    }
  }
}

// Remove from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body

    let cart

    if (req.session.user) {
      cart = await Cart.findOne({ userId: req.session.user._id })
      if (cart) {
        cart.items = cart.items.filter((item) => item.product.toString() !== productId)

        // Recalculate total
        cart.totalAmount = cart.items.reduce((total, item) => {
          return total + item.price * item.quantity
        }, 0)

        await cart.save()
      }
    } else {
      cart = req.session.cart
      if (cart) {
        cart.items = cart.items.filter((item) => item.product.toString() !== productId)

        // Recalculate total
        cart.totalAmount = cart.items.reduce((total, item) => {
          return total + item.price * item.quantity
        }, 0)
      }
    }

    req.flash("success", "Item removed from cart")
    res.redirect("/cart")
  } catch (error) {
    console.error("Error removing from cart:", error)
    req.flash("error", "Error removing item from cart")
    res.redirect("/cart")
  }
}

// Get cart count
exports.getCartCount = async (req, res) => {
  try {
    let count = 0

    if (req.session.user) {
      const cart = await Cart.findOne({ userId: req.session.user._id })
      if (cart) {
        count = cart.items.reduce((total, item) => total + item.quantity, 0)
      }
    } else {
      const cart = req.session.cart
      if (cart && cart.items) {
        count = cart.items.reduce((total, item) => total + item.quantity, 0)
      }
    }

    res.json({ count })
  } catch (error) {
    console.error("Error getting cart count:", error)
    res.json({ count: 0 })
  }
}

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    if (req.session.user) {
      await Cart.findOneAndDelete({ userId: req.session.user._id })
    } else {
      req.session.cart = { items: [], totalAmount: 0 }
    }

    res.json({ success: true })
  } catch (error) {
    console.error("Error clearing cart:", error)
    res.json({ success: false })
  }
}
