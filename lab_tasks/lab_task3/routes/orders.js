const express = require("express")
const Order = require("../models/Order")
const { requireAuth } = require("../middleware/auth")
const router = express.Router()

// GET /my-orders - Protected route to view user's orders
router.get("/my-orders", requireAuth, async (req, res) => {
  try {
    const userId = req.session.user.id

    // Fetch orders for the logged-in user, sorted by creation date (newest first)
    const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 }).lean()

    // Format dates for display
    const formattedOrders = orders.map((order) => ({
      ...order,
      createdAtFormatted: order.createdAt.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      totalAmountFormatted: `£${order.totalAmount.toFixed(2)}`,
    }))

    res.render("orders/my-orders", {
      title: "My Orders - Seasalt Cornwall",
      orders: formattedOrders,
      pageClass: "orders-page",
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    req.flash("error", "Unable to load your orders. Please try again.")
    res.redirect("/")
  }
})

// GET /my-orders/:orderId - View specific order details
router.get("/my-orders/:orderId", requireAuth, async (req, res) => {
  try {
    const userId = req.session.user.id
    const orderId = req.params.orderId

    // Find the specific order for this user
    const order = await Order.findOne({
      _id: orderId,
      userId: userId,
    }).lean()

    if (!order) {
      req.flash("error", "Order not found")
      return res.redirect("/my-orders")
    }

    // Format the order data
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

    res.render("orders/order-details", {
      title: `Order ${order.orderNumber} - Seasalt Cornwall`,
      order: formattedOrder,
      pageClass: "order-details-page",
    })
  } catch (error) {
    console.error("Error fetching order details:", error)
    req.flash("error", "Unable to load order details. Please try again.")
    res.redirect("/my-orders")
  }
})

module.exports = router
