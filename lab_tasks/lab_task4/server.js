require("dotenv").config()
const app = require("./app")
const connectDB = require("./config/database")
const { createAdminUser } = require("./utils/createAdmin")
const { seedProducts } = require("./utils/seedProducts")

const PORT = process.env.PORT || 3000

// Graceful shutdown handler
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`)
  process.exit(0)
}

// Handle shutdown signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"))
process.on("SIGINT", () => gracefulShutdown("SIGINT"))

// Start server with proper error handling
const startServer = async () => {
  try {
    // Connect to MongoDB
    console.log("🔌 Connecting to MongoDB...")
    await connectDB()

    // Initialize data
    console.log("🌱 Initializing application data...")
    await createAdminUser()
    await seedProducts()

    // Start server
    const server = app.listen(PORT, () => {
      console.log("\n🚀 Seasalt Cornwall Server Started Successfully!")
      console.log(`📍 Server running on: http://localhost:${PORT}`)
      console.log(`📊 Admin panel: http://localhost:${PORT}/admin`)
      console.log(`👤 Admin credentials: admin@seasalt.com / admin123`)
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`)
      console.log("=".repeat(50))
    })

    // Handle server errors
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use`)
      } else {
        console.error("❌ Server error:", error)
      }
      process.exit(1)
    })
  } catch (error) {
    console.error("❌ Failed to start server:", error.message)
    process.exit(1)
  }
}

// Start the application
startServer()
