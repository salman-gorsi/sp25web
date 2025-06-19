document.addEventListener("DOMContentLoaded", () => {
  // Confirm delete actions
  const deleteButtons = document.querySelectorAll('form[action*="/delete/"]')
  deleteButtons.forEach((form) => {
    form.addEventListener("submit", (e) => {
      if (!confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
        e.preventDefault()
      }
    })
  })

  // Auto-hide flash messages
  const flashMessages = document.querySelectorAll(".flash-message")
  flashMessages.forEach((message) => {
    setTimeout(() => {
      message.style.opacity = "0"
      setTimeout(() => {
        message.style.display = "none"
      }, 300)
    }, 5000)
  })

  // Image preview for product forms
  const imageUrlInput = document.getElementById("imageUrl")
  if (imageUrlInput) {
    imageUrlInput.addEventListener("blur", function () {
      const url = this.value.trim()
      if (url) {
        // Remove existing preview
        const existingPreview = document.querySelector(".image-preview")
        if (existingPreview) {
          existingPreview.remove()
        }

        // Create new preview
        const preview = document.createElement("div")
        preview.className = "image-preview"
        preview.innerHTML = `
          <img src="${url}" alt="Preview" style="max-width: 200px; max-height: 200px; object-fit: cover; border-radius: 4px; margin-top: 10px;" 
               onerror="this.parentElement.innerHTML='<p style=color:red;font-size:12px;margin-top:10px;>Invalid image URL</p>'">
        `
        this.parentElement.appendChild(preview)
      }
    })
  }

  // Form validation
  const adminForms = document.querySelectorAll(".admin-form")
  adminForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const requiredFields = form.querySelectorAll("[required]")
      let isValid = true

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.style.borderColor = "#dc3545"
        } else {
          field.style.borderColor = "#ced4da"
        }
      })

      if (!isValid) {
        e.preventDefault()
        alert("Please fill in all required fields.")
      }
    })
  })

  // Status update confirmation
  const statusForms = document.querySelectorAll(".status-form")
  statusForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const select = form.querySelector('select[name="status"]')
      const currentStatus = select.dataset.current || "unknown"
      const newStatus = select.value

      if (currentStatus !== newStatus) {
        if (!confirm(`Are you sure you want to change the order status to "${newStatus}"?`)) {
          e.preventDefault()
        }
      }
    })
  })

  // Table row highlighting
  const tableRows = document.querySelectorAll(".admin-table tbody tr")
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f8f9fa"
    })

    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = ""
    })
  })

  // Sidebar active link highlighting
  const currentPath = window.location.pathname
  const sidebarLinks = document.querySelectorAll(".admin-nav-link")

  sidebarLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active")
    }
  })

  // Search functionality for tables
  const searchInputs = document.querySelectorAll(".table-search")
  searchInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()
      const table = this.closest(".admin-table-container").querySelector(".admin-table")
      const rows = table.querySelectorAll("tbody tr")

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase()
        if (text.includes(searchTerm)) {
          row.style.display = ""
        } else {
          row.style.display = "none"
        }
      })
    })
  })
})
