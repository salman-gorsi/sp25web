const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  category: {
    type: String,
    required: true,
  },
})

const cartSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    default: 0,
    min: 0,
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

// Calculate total amount before saving
cartSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
  this.updatedAt = Date.now()
  next()
})

// Method to add item to cart
cartSchema.methods.addItem = function (product, quantity = 1) {
  const existingItemIndex = this.items.findIndex((item) => item.productId.toString() === product._id.toString())

  if (existingItemIndex >= 0) {
    // Update existing item quantity
    this.items[existingItemIndex].quantity += quantity
  } else {
    // Add new item
    this.items.push({
      productId: product._id,
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: quantity,
      category: product.category,
    })
  }
}

// Method to update item quantity
cartSchema.methods.updateItemQuantity = function (productId, quantity) {
  const itemIndex = this.items.findIndex((item) => item.productId.toString() === productId.toString())

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      this.items.splice(itemIndex, 1)
    } else {
      this.items[itemIndex].quantity = quantity
    }
  }
}

// Method to remove item from cart
cartSchema.methods.removeItem = function (productId) {
  this.items = this.items.filter((item) => item.productId.toString() !== productId.toString())
}

// Method to clear cart
cartSchema.methods.clearCart = function () {
  this.items = []
  this.totalAmount = 0
}

// Method to get total item count
cartSchema.methods.getItemCount = function () {
  return this.items.reduce((total, item) => total + item.quantity, 0)
}

module.exports = mongoose.model("Cart", cartSchema)
