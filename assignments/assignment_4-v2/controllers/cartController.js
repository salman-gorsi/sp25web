const Cart = require("../models/Cart")
const Product = require("../models/Product")
const Order = require("../models/Order")

// Helper function to get or create cart
const getOrCreateCart = async (sessionId, userId = null) => {
  let cart = await Cart.findOne({ sessionId })

  if (!cart) {
    cart = new Cart({
      sessionId,
      userId,
      items: [],
    })
    await cart.save()
  }

  return cart
}

// GET /cart - View cart
const getCart = async (req, res) => {
  try {
    const sessionId = req.sessionID
    const cart = await getOrCreateCart(sessionId, req.session.user?.id)

    // Format cart items for display
    const formattedItems = cart.items.map((item) => ({
      ...item.toObject(),
      priceFormatted: `£${item.price.toFixed(2)}`,
      totalFormatted: `£${(item.price * item.quantity).toFixed(2)}`,
    }))

    res.render("cart/view", {
      title: "Shopping Cart - Seasalt Cornwall",
      cart: {
        ...cart.toObject(),
        items: formattedItems,
        totalAmountFormatted: `£${cart.totalAmount.toFixed(2)}`,
        itemCount: cart.getItemCount(),
      },
      pageClass: "cart-page",
    })
  } catch (error) {
    console.error("Error fetching cart:", error)
    req.flash("error", "Unable to load cart. Please try again.")
    res.redirect("/products")
  }
}

// POST /cart/add - Add item to cart
const addToCart = async (req, res) => {
  try {
    console.log("Adding to cart:", req.body)
    const { productId, quantity = 1 } = req.body
    const sessionId = req.sessionID

    // Validate product exists
    const product = await Product.findById(productId)
    if (!product) {
      console.log("Product not found:", productId)
      req.flash("error", "Product not found")
      return res.redirect("/products")
    }

    console.log("Found product:", product.title)

    if (!product.inStock) {
      req.flash("error", "Product is currently out of stock")
      return res.redirect("/products")
    }

    // Get or create cart
    const cart = await getOrCreateCart(sessionId, req.session.user?.id)

    // Add item to cart
    cart.addItem(product, Number.parseInt(quantity))
    await cart.save()

    console.log("Item added to cart successfully")
    req.flash("success", `${product.title} added to cart!`)

    // Redirect to cart page
    res.redirect("/cart")
  } catch (error) {
    console.error("Error adding to cart:", error)
    req.flash("error", "Unable to add item to cart. Please try again.")
    res.redirect("/products")
  }
}

// POST /cart/update - Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const sessionId = req.sessionID

    const cart = await Cart.findOne({ sessionId })
    if (!cart) {
      req.flash("error", "Cart not found")
      return res.redirect("/cart")
    }

    const qty = Number.parseInt(quantity)
    if (qty < 1 || qty > 10) {
      req.flash("error", "Quantity must be between 1 and 10")
      return res.redirect("/cart")
    }

    cart.updateItemQuantity(productId, qty)
    await cart.save()

    req.flash("success", "Cart updated successfully!")
    res.redirect("/cart")
  } catch (error) {
    console.error("Error updating cart:", error)
    req.flash("error", "Unable to update cart. Please try again.")
    res.redirect("/cart")
  }
}

// POST /cart/remove - Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body
    const sessionId = req.sessionID

    const cart = await Cart.findOne({ sessionId })
    if (!cart) {
      req.flash("error", "Cart not found")
      return res.redirect("/cart")
    }

    cart.removeItem(productId)
    await cart.save()

    req.flash("success", "Item removed from cart!")
    res.redirect("/cart")
  } catch (error) {
    console.error("Error removing from cart:", error)
    req.flash("error", "Unable to remove item. Please try again.")
    res.redirect("/cart")
  }
}

// GET /checkout - Checkout page
const getCheckout = async (req, res) => {
  try {
    const sessionId = req.sessionID
    const cart = await Cart.findOne({ sessionId })

    if (!cart || cart.items.length === 0) {
      req.flash("error", "Your cart is empty")
      return res.redirect("/cart")
    }

    // Format cart items for display
    const formattedItems = cart.items.map((item) => ({
      ...item.toObject(),
      priceFormatted: `£${item.price.toFixed(2)}`,
      totalFormatted: `£${(item.price * item.quantity).toFixed(2)}`,
    }))

    res.render("cart/checkout", {
      title: "Checkout - Seasalt Cornwall",
      cart: {
        ...cart.toObject(),
        items: formattedItems,
        totalAmountFormatted: `£${cart.totalAmount.toFixed(2)}`,
        itemCount: cart.getItemCount(),
      },
      user: req.session.user || {},
      pageClass: "checkout-page",
    })
  } catch (error) {
    console.error("Error loading checkout:", error)
    req.flash("error", "Unable to load checkout. Please try again.")
    res.redirect("/cart")
  }
}

// POST /checkout/place-order - Place order with cash payment
const placeOrder = async (req, res) => {
  try {
    console.log("Placing order with data:", req.body)
    const { fullName, email, phone, addressLine1, addressLine2, city, postalCode, country } = req.body
    const sessionId = req.sessionID

    // Validate required fields
    if (!fullName || !email || !phone || !addressLine1 || !city || !postalCode || !country) {
      req.flash("error", "Please fill in all required fields")
      return res.redirect("/checkout")
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      req.flash("error", "Please enter a valid email address")
      return res.redirect("/checkout")
    }

    // Get cart
    const cart = await Cart.findOne({ sessionId })
    if (!cart || cart.items.length === 0) {
      req.flash("error", "Your cart is empty")
      return res.redirect("/cart")
    }

    // Create order
    const order = new Order({
      userId: req.session.user?.id || null,
      userEmail: email,
      items: cart.items.map((item) => ({
        productId: item.productId.toString(),
        productName: item.title,
        productImage: item.imageUrl,
        quantity: item.quantity,
        price: item.price,
        category: item.category,
      })),
      totalAmount: cart.totalAmount,
      status: "pending",
      shippingAddress: {
        fullName,
        addressLine1,
        addressLine2: addressLine2 || "",
        city,
        postalCode,
        country,
      },
      customerDetails: {
        email,
        phone,
      },
      paymentMethod: "cash",
    })

    await order.save()
    console.log("Order saved successfully:", order.orderNumber)

    // Clear cart
    cart.clearCart()
    await cart.save()

    req.flash("success", `Order placed successfully! Your order number is ${order.orderNumber}`)
    res.redirect(`/order-confirmation/${order._id}`)
  } catch (error) {
    console.error("Error placing order:", error)
    req.flash("error", "Unable to place order. Please try again.")
    res.redirect("/checkout")
  }
}

// GET /order-confirmation/:orderId - Order confirmation page
const getOrderConfirmation = async (req, res) => {
  try {
    const orderId = req.params.orderId
    const order = await Order.findById(orderId).lean()

    if (!order) {
      req.flash("error", "Order not found")
      return res.redirect("/")
    }

    // Format order for display
    const formattedOrder = {
      ...order,
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

    res.render("cart/order-confirmation", {
      title: `Order Confirmation - ${order.orderNumber}`,
      order: formattedOrder,
      pageClass: "order-confirmation-page",
    })
  } catch (error) {
    console.error("Error loading order confirmation:", error)
    req.flash("error", "Unable to load order details.")
    res.redirect("/")
  }
}

// Helper function to get cart count for header
const getCartCount = async (sessionId) => {
  try {
    const cart = await Cart.findOne({ sessionId })
    return cart ? cart.getItemCount() : 0
  } catch (error) {
    console.error("Error getting cart count:", error)
    return 0
  }
}

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  getCheckout,
  placeOrder,
  getOrderConfirmation,
  getCartCount,
}
