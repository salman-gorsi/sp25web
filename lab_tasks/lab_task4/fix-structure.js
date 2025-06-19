const fs = require("fs")
const path = require("path")

// Script to create the correct directory structure
const createDirectories = () => {
  const directories = [
    "public",
    "public/css",
    "public/js",
    "assignment_2",
    "assignment_2/assets",
    "views",
    "views/layouts",
    "views/partials",
    "views/auth",
    "views/orders",
    "config",
    "models",
    "middleware",
    "routes",
    "utils",
  ]

  directories.forEach((dir) => {
    const dirPath = path.join(__dirname, dir)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
      console.log(`✓ Created directory: ${dir}`)
    } else {
      console.log(`✓ Directory exists: ${dir}`)
    }
  })
}

console.log("Creating directory structure...")
createDirectories()
console.log("Directory structure setup complete!")
