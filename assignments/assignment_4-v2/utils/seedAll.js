const connectDB = require("../config/database")
const { createAdminUser } = require("./createAdmin")
const { seedProducts } = require("./seedProducts")

const seedAll = async () => {
  try {
    console.log("🌱 Starting database seeding...")

    await connectDB()
    await createAdminUser()
    await seedProducts()

    console.log("✅ Database seeding completed successfully!")
    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  seedAll()
}

module.exports = seedAll
