// Admin middleware
const requireAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.isAdmin) {
    return next()
  } else {
    req.flash("error", "Access denied. Admin privileges required.")
    return res.redirect("/")
  }
}

// Middleware to add admin status to all responses
const addAdminToLocals = (req, res, next) => {
  const user = req.session.user || null
  res.locals.isAdmin = !!(user && user.isAdmin)
  next()
}

module.exports = {
  requireAdmin,
  addAdminToLocals,
}
