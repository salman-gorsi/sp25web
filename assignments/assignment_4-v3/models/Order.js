const mongoose = require("mongoose")

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
})

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // Allow guest orders
  },
  userEmail: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  customerDetails: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      street: String,
      city: String,
      postalCode: String,
      country: String,
    },
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "card", "paypal", "apple_pay", "klarna"],
    default: "cash",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Generate order number before saving
orderSchema.pre("save", function (next) {
  if (!this.orderNumber) {
    this.orderNumber = "SC" + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase()
  }
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model("Order", orderSchema)
