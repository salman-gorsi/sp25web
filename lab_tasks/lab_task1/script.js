// Import Bootstrap (if necessary, depending on your setup)
// For example, if using a module bundler:
// import * as bootstrap from 'bootstrap';

// If using a CDN or direct script include, ensure Bootstrap is loaded before this script runs.
// You might need to adjust the following lines if Bootstrap is not globally available.
// If Bootstrap is globally available, you can skip the import and the following lines should work as is.

// Initialize Bootstrap tooltips
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips if they exist
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    let bootstrap = window.bootstrap; // Assign the global bootstrap object to the local variable
    if (typeof bootstrap !== 'undefined') {
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    if(backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Feedback button functionality
    const feedbackButton = document.querySelector('.position-fixed.top-50.end-0');
    if(feedbackButton) {
        feedbackButton.addEventListener('click', function() {
            alert('Thank you for your interest in providing feedback. Our feedback form will be available soon.');
        });
    }

    // Add hover effects to category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // Form validation for newsletter
    const newsletterForm = document.querySelector('.newsletter-section form');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if(emailInput.value.trim() === '') {
                alert('Please enter your email address.');
                return;
            }
            
            // Simple email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailPattern.test(emailInput.value)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
});