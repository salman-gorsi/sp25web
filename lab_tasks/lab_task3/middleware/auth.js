// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next()
  } else {
    req.flash("error", "Please log in to access this page")
    return res.redirect("/login")
  }
}

// Middleware to check if user is already logged in
const redirectIfLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect("/")
  }
  next()
}

// Middleware to add user info to all responses
const addUserToLocals = (req, res, next) => {
  res.locals.user = req.session.user || null
  res.locals.isAuthenticated = !!(req.session && req.session.user)
  next()
}

module.exports = {
  requireAuth,
  redirectIfLoggedIn,
  addUserToLocals,
}
