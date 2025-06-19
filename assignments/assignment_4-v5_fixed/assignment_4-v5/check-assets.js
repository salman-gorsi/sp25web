const fs = require("fs")
const path = require("path")

// Script to check if all required assets exist
const assetsDir = path.join(__dirname, "assignment_2", "assets")
const publicDir = path.join(__dirname, "public")

console.log("Checking assets directory:", assetsDir)
console.log("Checking public directory:", publicDir)

// Required assets from the original project
const requiredAssets = [
  "logo.svg",
  "top-background.webp",
  "dresses.avif",
  "tops.avif",
  "knitwear.avif",
  "holiday-shop.avif",
  "seasalt-linen.avif",
  "seasalt-men.avif",
  "findAShop.avif",
  "ImpactReport.avif",
  "Inspiration.avif",
  "1st-video.mp4",
  "visa.svg",
  "mastercard.svg",
  "maestro.svg",
  "amex.svg",
  "diners.svg",
  "apple_pay.svg",
  "klarna.svg",
  "paypal.svg",
]

console.log("\n=== CHECKING ASSETS ===")
const missingAssets = []

requiredAssets.forEach((asset) => {
  const assetPath = path.join(assetsDir, asset)
  if (fs.existsSync(assetPath)) {
    console.log(`✓ Found: ${asset}`)
  } else {
    console.log(`✗ Missing: ${asset}`)
    missingAssets.push(asset)
  }
})

console.log("\n=== CHECKING PUBLIC DIRECTORY ===")
const publicCssDir = path.join(publicDir, "css")
const publicJsDir = path.join(publicDir, "js")

if (!fs.existsSync(publicCssDir)) {
  console.log("✗ Missing: public/css directory")
  fs.mkdirSync(publicCssDir, { recursive: true })
  console.log("✓ Created: public/css directory")
}

if (!fs.existsSync(publicJsDir)) {
  console.log("✗ Missing: public/js directory")
  fs.mkdirSync(publicJsDir, { recursive: true })
  console.log("✓ Created: public/js directory")
}

// Check if CSS and JS files exist
const cssFile = path.join(publicCssDir, "styles.css")
const jsFile = path.join(publicJsDir, "main.js")

if (!fs.existsSync(cssFile)) {
  console.log("✗ Missing: public/css/styles.css")
} else {
  console.log("✓ Found: public/css/styles.css")
}

if (!fs.existsSync(jsFile)) {
  console.log("✗ Missing: public/js/main.js")
} else {
  console.log("✓ Found: public/js/main.js")
}

console.log("\n=== SUMMARY ===")
if (missingAssets.length > 0) {
  console.log(`Missing ${missingAssets.length} assets:`)
  missingAssets.forEach((asset) => console.log(`  - ${asset}`))
  console.log("\nPlease ensure all assets are in the assignment_2/assets/ directory")
} else {
  console.log("All required assets found!")
}

console.log("\n=== DIRECTORY STRUCTURE CHECK ===")
console.log("Expected structure:")
console.log("├── assignment_2/")
console.log("│   └── assets/")
console.log("│       ├── logo.svg")
console.log("│       ├── top-background.webp")
console.log("│       └── ... (other assets)")
console.log("├── public/")
console.log("│   ├── css/")
console.log("│   │   └── styles.css")
console.log("│   └── js/")
console.log("│       └── main.js")
console.log("└── views/")
console.log("    └── ... (EJS templates)")
