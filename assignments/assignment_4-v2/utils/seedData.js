const User = require("../models/User")
const Order = require("../models/Order")

// Sample orders data for demonstration
const sampleOrders = [
  {
    items: [
      {
        productId: "1",
        productName: "Cornish Coast Dress",
        productImage: "/assets/dresses.avif",
        quantity: 1,
        price: 89.99,
        category: "dresses",
      },
      {
        productId: "2",
        productName: "Maritime Stripe Top",
        productImage: "/assets/tops.avif",
        quantity: 2,
        price: 45.99,
        category: "tops",
      },
    ],
    totalAmount: 181.97,
    status: "delivered",
    shippingAddress: {
      fullName: "Jane Smith",
      addressLine1: "123 Harbour View",
      city: "St Ives",
      postalCode: "TR26 1AB",
      country: "United Kingdom",
    },
    paymentMethod: "card",
  },
  {
    items: [
      {
        productId: "3",
        productName: "Fisherman's Knit Sweater",
        productImage: "/assets/knitwear.avif",
        quantity: 1,
        price: 125.0,
        category: "knitwear",
      },
    ],
    totalAmount: 125.0,
    status: "shipped",
    shippingAddress: {
      fullName: "Jane Smith",
      addressLine1: "123 Harbour View",
      city: "St Ives",
      postalCode: "TR26 1AB",
      country: "United Kingdom",
    },
    paymentMethod: "paypal",
  },
  {
    items: [
      {
        productId: "4",
        productName: "Coastal Walk Jacket",
        productImage: "/assets/holiday-shop.avif",
        quantity: 1,
        price: 159.99,
        category: "outerwear",
      },
      {
        productId: "1",
        productName: "Cornish Coast Dress",
        productImage: "/assets/dresses.avif",
        quantity: 1,
        price: 89.99,
        category: "dresses",
      },
    ],
    totalAmount: 249.98,
    status: "processing",
    shippingAddress: {
      fullName: "Jane Smith",
      addressLine1: "123 Harbour View",
      city: "St Ives",
      postalCode: "TR26 1AB",
      country: "United Kingdom",
    },
    paymentMethod: "apple_pay",
  },
]

const seedOrders = async (userId, userEmail) => {
  try {
    // Check if orders already exist for this user
    const existingOrders = await Order.find({ userId })

    if (existingOrders.length === 0) {
      // Create sample orders for the user
      const ordersToCreate = sampleOrders.map((orderData) => ({
        ...orderData,
        userId,
        userEmail,
      }))

      await Order.insertMany(ordersToCreate)
      console.log(`Created ${ordersToCreate.length} sample orders for user ${userEmail}`)
    }
  } catch (error) {
    console.error("Error seeding orders:", error)
  }
}

module.exports = {
  seedOrders,
}
