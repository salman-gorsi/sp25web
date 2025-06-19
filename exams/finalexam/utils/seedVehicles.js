const Vehicle = require("../models/Vehicle")

const sampleVehicles = [
  {
    name: "Model S",
    brand: "Tesla",
    price: 89990,
    type: "Sedan",
    imageUrl: "/assets/tesla-model-s.jpg",
    description: "Premium electric sedan with autopilot capabilities and exceptional performance.",
    inStock: true,
    featured: true,
  },
  {
    name: "Range Rover Evoque",
    brand: "Land Rover",
    price: 45990,
    type: "SUV",
    imageUrl: "/assets/range-rover-evoque.jpg",
    description: "Compact luxury SUV with distinctive design and advanced technology.",
    inStock: true,
    featured: true,
  },
  {
    name: "F-150 Lightning",
    brand: "Ford",
    price: 52974,
    type: "Truck",
    imageUrl: "/assets/ford-f150-lightning.jpg",
    description: "All-electric pickup truck with impressive towing capacity and range.",
    inStock: true,
    featured: false,
  },
  {
    name: "3 Series",
    brand: "BMW",
    price: 41250,
    type: "Sedan",
    imageUrl: "/assets/bmw-3-series.jpg",
    description: "Sports sedan combining luxury, performance, and efficiency.",
    inStock: true,
    featured: false,
  },
  {
    name: "X5",
    brand: "BMW",
    price: 59400,
    type: "SUV",
    imageUrl: "/assets/bmw-x5.jpg",
    description: "Luxury SUV with spacious interior and advanced driving assistance.",
    inStock: false,
    featured: false,
  },
  {
    name: "Silverado 1500",
    brand: "Chevrolet",
    price: 34600,
    type: "Truck",
    imageUrl: "/assets/chevy-silverado.jpg",
    description: "Full-size pickup truck with powerful engine options and modern technology.",
    inStock: true,
    featured: false,
  },
]

const seedVehicles = async () => {
  try {
    const existingVehicles = await Vehicle.countDocuments()

    if (existingVehicles === 0) {
      await Vehicle.insertMany(sampleVehicles)
      console.log("Sample vehicles created successfully!")
    } else {
      console.log("Vehicles already exist in database")
    }
  } catch (error) {
    console.error("Error seeding vehicles:", error)
  }
}

module.exports = { seedVehicles }
