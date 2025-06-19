const Product = require("../models/Product")

const sampleProducts = [
  {
    title: "Cornish Coast Dress",
    description:
      "Beautiful flowing dress inspired by the Cornish coastline. Perfect for summer days and coastal walks.",
    price: 89.99,
    imageUrl: "/assets/dresses.avif",
    category: "dresses",
    inStock: true,
    featured: true,
  },
  {
    title: "Maritime Stripe Top",
    description: "Classic striped top with nautical inspiration. Comfortable cotton blend perfect for everyday wear.",
    price: 45.99,
    imageUrl: "/assets/tops.avif",
    category: "tops",
    inStock: true,
    featured: true,
  },
  {
    title: "Fisherman's Knit Sweater",
    description: "Traditional fisherman's sweater with cable knit detail. Warm and cozy for cooler days.",
    price: 125.0,
    imageUrl: "/assets/knitwear.avif",
    category: "knitwear",
    inStock: true,
    featured: true,
  },
  {
    title: "Coastal Walk Jacket",
    description: "Lightweight waterproof jacket perfect for coastal walks. Stylish and practical.",
    price: 159.99,
    imageUrl: "/assets/Outerwear.avif",
    category: "outerwear",
    inStock: true,
    featured: false,
  },
  {
    title: "Harbour View Trousers",
    description: "Comfortable cotton trousers with a relaxed fit. Perfect for casual days.",
    price: 69.99,
    imageUrl: "/assets/Trousers.avif",
    category: "trousers",
    inStock: true,
    featured: false,
  },
  {
    title: "Seasalt Men's Shirt",
    description: "Classic men's shirt with subtle seasalt branding. Smart casual style.",
    price: 79.99,
    imageUrl: "/assets/seasalt-men.avif",
    category: "mens",
    inStock: true,
    featured: false,
  },
]

const seedProducts = async () => {
  try {
    const existingProducts = await Product.countDocuments()

    if (existingProducts === 0) {
      await Product.insertMany(sampleProducts)
      console.log("Sample products created successfully!")
    } else {
      console.log("Products already exist in database")
    }
  } catch (error) {
    console.error("Error seeding products:", error)
  }
}

module.exports = { seedProducts }
