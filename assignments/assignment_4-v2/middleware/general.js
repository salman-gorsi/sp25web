const flash = require("connect-flash")

// Setup flash messages middleware
const setupFlashMessages = (req, res, next) => {
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  res.locals.info = req.flash("info")
  res.locals.warning = req.flash("warning")
  next()
}

// Log missing files middleware
const logMissingFiles = (req, res, next) => {
  // Only log for static file requests that result in 404
  if (req.url.includes("/assets/") || req.url.includes("/css/") || req.url.includes("/js/")) {
    console.log(`Missing file requested: ${req.url}`)
  }
  next()
}

// Set default locals
const setDefaultLocals = (req, res, next) => {
  // Set default values for all templates
  res.locals.title = res.locals.title || "Seasalt Cornwall"
  res.locals.pageClass = res.locals.pageClass || ""
  res.locals.user = res.locals.user || null
  res.locals.isAuthenticated = res.locals.isAuthenticated || false
  res.locals.isAdmin = res.locals.isAdmin || false
  res.locals.cartCount = res.locals.cartCount || 0

  next()
}

module.exports = {
  setupFlashMessages,
  logMissingFiles,
  setDefaultLocals,
}
