const Cart = require("../models/Cart")
const Order = require("../models/Order")
const Product = require("../models/Product")

// Show checkout page
const showCheckout = async (req, res) => {
  try {
    let cart
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id }).populate("items.product")
    } else {
      cart = await Cart.findOne({ sessionId: req.sessionID }).populate("items.product")
    }

    if (!cart || cart.items.length === 0) {
      req.flash("error", "Your cart is empty")
      return res.redirect("/cart")
    }

    res.render("checkout/checkout", {
      title: "Checkout - Seasalt Cornwall",
      pageClass: "checkout-page",
      cart,
      items: cart.items,
      totalAmount: cart.totalAmount,
      user: req.user,
    })
  } catch (error) {
    console.error("Checkout error:", error)
    req.flash("error", "Failed to load checkout page")
    res.redirect("/cart")
  }
}

// Process order
const processOrder = async (req, res) => {
  try {
    const { name, email, phone, address, city, postalCode } = req.body

    // Validation
    if (!name || !email || !phone || !address || !city || !postalCode) {
      req.flash("error", "Please fill in all required fields")
      return res.redirect("/checkout")
    }

    // Get cart
    let cart
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id }).populate("items.product")
    } else {
      cart = await Cart.findOne({ sessionId: req.sessionID }).populate("items.product")
    }

    if (!cart || cart.items.length === 0) {
      req.flash("error", "Your cart is empty")
      return res.redirect("/cart")
    }

    // Create order
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      productName: item.product.name,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    }))

    const order = new Order({
      user: req.user ? req.user._id : null,
      sessionId: req.user ? null : req.sessionID,
      items: orderItems,
      totalAmount: cart.totalAmount,
      customerDetails: {
        name,
        email,
        phone,
        address,
        city,
        postalCode,
      },
      paymentMethod: "cash",
      status: "pending",
      orderDate: new Date(),
    })

    await order.save()

    // Clear cart
    await Cart.findByIdAndDelete(cart._id)

    // Redirect to confirmation
    res.redirect(`/checkout/confirmation/${order._id}`)
  } catch (error) {
    console.error("Process order error:", error)
    req.flash("error", "Failed to process order. Please try again.")
    res.redirect("/checkout")
  }
}

// Show order confirmation
const showConfirmation = async (req, res) => {
  try {
    const { orderId } = req.params
    const order = await Order.findById(orderId).populate("items.product")

    if (!order) {
      req.flash("error", "Order not found")
      return res.redirect("/")
    }

    // Check if user owns this order (for logged-in users)
    if (req.user && order.user && order.user.toString() !== req.user._id.toString()) {
      req.flash("error", "Access denied")
      return res.redirect("/")
    }

    // Check session for guest orders
    if (!req.user && order.sessionId !== req.sessionID) {
      req.flash("error", "Access denied")
      return res.redirect("/")
    }

    res.render("checkout/confirmation", {
      title: "Order Confirmation - Seasalt Cornwall",
      pageClass: "confirmation-page",
      order,
    })
  } catch (error) {
    console.error("Confirmation error:", error)
    req.flash("error", "Failed to load order confirmation")
    res.redirect("/")
  }
}

module.exports = {
  showCheckout,
  processOrder,
  showConfirmation,
}
