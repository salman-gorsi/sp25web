const flash = require("connect-flash")
const path = require("path")
const fs = require("fs")

// Flash messages middleware
const setupFlashMessages = (req, res, next) => {
  flash()(req, res, () => {
    res.locals.messages = req.flash()
    next()
  })
}

// Log missing files middleware (development only)
const logMissingFiles = (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    if (req.url.startsWith("/assets/") || req.url.startsWith("/css/") || req.url.startsWith("/js/")) {
      const filePath = path.join(__dirname, "..", req.url.startsWith("/assets/") ? "assignment_2" : "public", req.url)
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Missing file: ${filePath}`)
      }
    }
  }
  next()
}

module.exports = {
  setupFlashMessages,
  logMissingFiles,
}
