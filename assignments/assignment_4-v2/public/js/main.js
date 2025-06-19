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
