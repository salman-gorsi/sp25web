document.addEventListener("DOMContentLoaded", () => {
  // Quantity controls for cart items
  const quantityButtons = document.querySelectorAll(".quantity-btn")

  quantityButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.dataset.productId
      const input = document.getElementById(`quantity-${productId}`)
      const currentValue = Number.parseInt(input.value)

      if (this.classList.contains("minus") && currentValue > 1) {
        input.value = currentValue - 1
      } else if (this.classList.contains("plus") && currentValue < 10) {
        input.value = currentValue + 1
      }
    })
  })

  // Auto-submit quantity forms when input changes
  const quantityInputs = document.querySelectorAll(".quantity-input")

  quantityInputs.forEach((input) => {
    let timeout
    input.addEventListener("input", function () {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (this.value >= 1 && this.value <= 10) {
          this.closest("form").submit()
        }
      }, 1000) // Submit after 1 second of no changes
    })
  })

  // Add to cart form handling
  const addToCartForms = document.querySelectorAll(".add-to-cart-form")

  addToCartForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      const button = this.querySelector(".add-to-cart-btn")
      const originalText = button.innerHTML

      // Disable button and show loading state
      button.disabled = true
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...'

      // Re-enable button after form submission
      setTimeout(() => {
        button.disabled = false
        button.innerHTML = originalText
      }, 2000)
    })
  })

  // Checkout form validation
  const checkoutForm = document.querySelector(".checkout-form")

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      const requiredFields = this.querySelectorAll("[required]")
      let isValid = true

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.style.borderColor = "#dc3545"
          field.focus()
        } else {
          field.style.borderColor = "#ddd"
        }
      })

      // Validate email format
      const emailField = this.querySelector('input[type="email"]')
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(emailField.value)) {
          isValid = false
          emailField.style.borderColor = "#dc3545"
          alert("Please enter a valid email address")
        }
      }

      // Validate phone number (basic validation)
      const phoneField = this.querySelector('input[type="tel"]')
      if (phoneField && phoneField.value) {
        const phoneRegex = /^[+]?[0-9\s\-$$$$]{10,}$/
        if (!phoneRegex.test(phoneField.value)) {
          isValid = false
          phoneField.style.borderColor = "#dc3545"
          alert("Please enter a valid phone number")
        }
      }

      if (!isValid) {
        e.preventDefault()
        return false
      }

      // Show loading state on submit button
      const submitButton = this.querySelector('button[type="submit"]')
      if (submitButton) {
        submitButton.disabled = true
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Order...'
      }
    })
  }

  // Update cart count in header when items are added
  const updateCartCount = () => {
    const cartBadge = document.querySelector(".cart-count-badge")
    if (cartBadge) {
      // This would typically be updated via AJAX or page reload
      // For now, it updates on page load
    }
  }

  // Print functionality for order confirmation
  const printButton = document.querySelector('button[onclick="window.print()"]')
  if (printButton) {
    printButton.addEventListener("click", () => {
      window.print()
    })
  }
})
