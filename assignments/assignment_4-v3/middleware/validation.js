const { body, validationResult } = require("express-validator")

// Validation rules for user registration
const validateRegistration = [
  body("name").trim().isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),

  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email address"),

  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match")
    }
    return true
  }),
]

// Validation rules for product creation/update
const validateProduct = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Product title is required and must be less than 200 characters"),

  body("description")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),

  body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),

  body("imageUrl").isURL().withMessage("Please provide a valid image URL"),

  body("category")
    .isIn(["dresses", "tops", "knitwear", "outerwear", "trousers", "accessories", "mens", "new", "sale"])
    .withMessage("Please select a valid category"),
]

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg)
    req.flash("error", errorMessages.join(". "))
    return res.redirect("back")
  }

  next()
}

module.exports = {
  validateRegistration,
  validateProduct,
  handleValidationErrors,
}
