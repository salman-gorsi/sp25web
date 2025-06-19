const Cart = require("../models/Cart")

// Middleware to add cart count to all responses
const addCartToLocals = async (req, res, next) => {
  try {
    let cartCount = 0

    if (req.sessionID) {
      const cart = await Cart.findOne({ sessionId: req.sessionID })
      if (cart && cart.items) {
        cartCount = cart.items.reduce((total, item) => total + item.quantity, 0)
      }
    }

    res.locals.cartCount = cartCount
  } catch (error) {
    console.error("Error getting cart count:", error)
    res.locals.cartCount = 0
  }

  next()
}

module.exports = {
  addCartToLocals,
}
