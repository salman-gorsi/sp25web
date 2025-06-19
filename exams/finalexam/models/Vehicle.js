const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    required: true,
    enum: ["Sedan", "SUV", "Truck"],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  featured: {
    type: Boolean,
    default: false,
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
vehicleSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model("Vehicle", vehicleSchema)
