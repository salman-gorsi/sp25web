const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
})

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // Allow guest carts
  },
  sessionId: {
    type: String,
    required: false, // For guest users
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
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

// Update the updatedAt field before saving
cartSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

// Calculate total amount before saving
cartSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
  next()
})

module.exports = mongoose.model("Cart", cartSchema)
