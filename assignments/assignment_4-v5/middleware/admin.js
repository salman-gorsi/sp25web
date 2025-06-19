const User = require("../models/User")

// Middleware to check if user is admin
const requireAdmin = async (req, res, next) => {
  try {
    if (!req.session || !req.session.user) {
      req.flash("error", "Please log in to access admin panel")
      return res.redirect("/login")
    }

    // Check if user is admin (you can modify this logic)
    const user = await User.findById(req.session.user.id)
    if (!user || !user.isAdmin) {
      req.flash("error", "Access denied. Admin privileges required.")
      return res.redirect("/")
    }

    next()
  } catch (error) {
    console.error("Admin middleware error:", error)
    req.flash("error", "Authentication error")
    res.redirect("/login")
  }
}

// Middleware to add admin status to locals
const addAdminToLocals = async (req, res, next) => {
  res.locals.isAdmin = false

  if (req.session && req.session.user) {
    try {
      const user = await User.findById(req.session.user.id)
      res.locals.isAdmin = user && user.isAdmin
    } catch (error) {
      console.error("Error checking admin status:", error)
    }
  }

  next()
}

module.exports = {
  requireAdmin,
  addAdminToLocals,
}
