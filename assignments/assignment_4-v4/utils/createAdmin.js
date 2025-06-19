const User = require("../models/User")
const bcrypt = require("bcryptjs")

const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@seasalt.com" })

    if (existingAdmin) {
      console.log("Admin user already exists")
      return
    }

    // Create admin user
    const adminUser = new User({
      name: "Admin User",
      email: "admin@seasalt.com",
      password: "admin123", // This will be hashed by the User model
      isAdmin: true,
    })

    await adminUser.save()
    console.log("Admin user created successfully!")
    console.log("Email: admin@seasalt.com")
    console.log("Password: admin123")
  } catch (error) {
    console.error("Error creating admin user:", error)
  }
}

module.exports = { createAdminUser }
