document.addEventListener("DOMContentLoaded", () => {
  // Flash message close functionality
  const closeButtons = document.querySelectorAll(".close-flash")
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.parentElement.style.display = "none"
    })
  })

  // Auto-hide flash messages after 5 seconds
  const flashMessages = document.querySelectorAll(".flash-message")
  flashMessages.forEach((message) => {
    setTimeout(() => {
      message.style.opacity = "0"
      setTimeout(() => {
        message.style.display = "none"
      }, 300)
    }, 5000)
  })

  // Update cart count on page load
  updateCartCount()

  // Add to cart form handling
  const addToCartForms = document.querySelectorAll('form[action="/cart/add"]')
  addToCartForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      const button = this.querySelector('button[type="submit"]')
      const originalText = button.innerHTML

      // Disable button and show loading state
      button.disabled = true
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...'

      // Re-enable button after form submission
      setTimeout(() => {
        button.disabled = false
        button.innerHTML = originalText
        updateCartCount()
      }, 1000)
    })
  })

  // Cart count update function
  function updateCartCount() {
    fetch("/cart/count")
      .then((response) => response.json())
      .then((data) => {
        const cartCountElement = document.getElementById("cart-count")
        if (cartCountElement) {
          cartCountElement.textContent = data.count
          if (data.count > 0) {
            cartCountElement.classList.remove("hidden")
          } else {
            cartCountElement.classList.add("hidden")
          }
        }
      })
      .catch((error) => {
        console.error("Error updating cart count:", error)
      })
  }

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
        } else {
          field.style.borderColor = "#ddd"
        }
      })

      // Email validation
      const emailField = this.querySelector('input[type="email"]')
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(emailField.value)) {
          isValid = false
          emailField.style.borderColor = "#dc3545"
          alert("Please enter a valid email address")
        }
      }

      // Phone validation
      const phoneField = this.querySelector('input[name="phone"]')
      if (phoneField && phoneField.value) {
        const phoneRegex = /^[\d\s\-+$$$$]+$/
        if (!phoneRegex.test(phoneField.value)) {
          isValid = false
          phoneField.style.borderColor = "#dc3545"
          alert("Please enter a valid phone number")
        }
      }

      if (!isValid) {
        e.preventDefault()
        alert("Please fill in all required fields correctly")
      } else {
        // Show loading state on submit button
        const submitButton = this.querySelector('button[type="submit"]')
        submitButton.disabled = true
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Placing Order...'
      }
    })
  }

  // Carousel functionality
  const slides = document.querySelectorAll(".carousel-slide")
  const dots = document.querySelectorAll(".carousel-dot")
  const prevButtons = document.querySelectorAll(".carousel-nav.prev")
  const nextButtons = document.querySelectorAll(".carousel-nav.next")
  let currentSlide = 0

  // Function to show a specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.classList.remove("active")
    })

    // Deactivate all dots
    dots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show the selected slide
    if (slides[index]) {
      slides[index].classList.add("active")
    }
    if (dots[index]) {
      dots[index].classList.add("active")
    }

    currentSlide = index
  }

  // Set up dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index)
    })
  })

  // Set up prev button click handlers
  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let newIndex = currentSlide - 1
      if (newIndex < 0) newIndex = slides.length - 1
      showSlide(newIndex)
    })
  })

  // Set up next button click handlers
  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let newIndex = currentSlide + 1
      if (newIndex >= slides.length) newIndex = 0
      showSlide(newIndex)
    })
  })

  // Back to top functionality
  const backToTopButton = document.querySelector(".back-to-top")
  if (backToTopButton) {
    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Search functionality (basic)
  const searchInput = document.querySelector(".search-bar input")
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const searchTerm = this.value.trim()
        if (searchTerm) {
          // Redirect to products page with search parameter
          window.location.href = `/products?search=${encodeURIComponent(searchTerm)}`
        }
      }
    })
  }

  // Form validation for authentication forms
  const authForms = document.querySelectorAll(".auth-form")
  authForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const passwords = form.querySelectorAll('input[type="password"]')

      if (passwords.length === 2) {
        // Registration form - check password match
        if (passwords[0].value !== passwords[1].value) {
          e.preventDefault()
          alert("Passwords do not match!")
          return false
        }
      }

      // Check password length
      if (passwords[0] && passwords[0].value.length < 6) {
        e.preventDefault()
        alert("Password must be at least 6 characters long!")
        return false
      }
    })
  })
})
