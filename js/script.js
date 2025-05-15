// Main JavaScript file for HisStripes Health Care Services, PLLC website

document.addEventListener('DOMContentLoaded', function() {
    // Active navigation highlighting
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if(link.getAttribute('href') === currentLocation || 
           (currentLocation === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm('contactForm')) {
                // In a real implementation, this would send the form data to a server
                // For now, we'll just show a success message
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // Form validation for booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm('bookingForm')) {
                // In a real implementation, this would send the booking data to a server
                // For now, we'll just show a success message
                alert('Thank you for scheduling a consultation! We will confirm your appointment soon.');
                bookingForm.reset();
            }
        });
    }

    // Function to validate form fields
    function validateForm(formId) {
        const form = document.getElementById(formId);
        let isValid = true;
        
        // Remove any existing error messages
        const existingErrors = form.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
        
        // Reset all fields to default styling
        const formFields = form.querySelectorAll('input, textarea, select');
        formFields.forEach(field => {
            field.style.borderColor = '';
        });
        
        // Validate each required field
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                highlightError(field, 'This field is required');
            }
        });
        
        // Validate email fields
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value.trim() && !isValidEmail(field.value)) {
                isValid = false;
                highlightError(field, 'Please enter a valid email address');
            }
        });
        
        // Validate phone fields
        const phoneFields = form.querySelectorAll('input[type="tel"]');
        phoneFields.forEach(field => {
            if (field.value.trim() && !isValidPhone(field.value)) {
                isValid = false;
                highlightError(field, 'Please enter a valid phone number');
            }
        });
        
        // Validate date fields for booking form
        if (formId === 'bookingForm') {
            const dateField = form.querySelector('#preferredDate');
            if (dateField && dateField.value) {
                const selectedDate = new Date(dateField.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate < today) {
                    isValid = false;
                    highlightError(dateField, 'Please select a future date');
                }
            }
        }
        
        return isValid;
    }
    
    // Helper function to highlight errors
    function highlightError(field, message) {
        field.style.borderColor = 'red';
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '12px';
        errorMessage.style.marginTop = '5px';
        errorMessage.textContent = message;
        
        field.parentNode.appendChild(errorMessage);
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to validate phone format
    function isValidPhone(phone) {
        // This is a simple validation that allows various formats
        // In a real implementation, you might want to use a more specific regex based on your country's phone format
        const phoneRegex = /^[\d\s\-\(\)\.+]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    // Add date restrictions to booking form
    const dateField = document.getElementById('preferredDate');
    if (dateField) {
        // Set min date to today
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        const todayString = yyyy + '-' + mm + '-' + dd;
        
        dateField.setAttribute('min', todayString);
        
        // Set max date to 3 months from now
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        const maxDd = String(maxDate.getDate()).padStart(2, '0');
        const maxMm = String(maxDate.getMonth() + 1).padStart(2, '0');
        const maxYyyy = maxDate.getFullYear();
        const maxDateString = maxYyyy + '-' + maxMm + '-' + maxDd;
        
        dateField.setAttribute('max', maxDateString);
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Card hover effects
    const cards = document.querySelectorAll('.feature-card, .service-card, .insurance-card, .cta-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Mobile menu toggle functionality
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navContainer = document.querySelector('.nav-container');
    
    if (mobileToggle && navContainer) {
        mobileToggle.addEventListener('click', function() {
            navContainer.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navContainer && navContainer.classList.contains('active')) {
            if (!e.target.closest('.nav-container') && !e.target.closest('.mobile-nav-toggle')) {
                navContainer.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                }
            }
        }
    });

    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.hero-content, .feature-card, .service-card, .insurance-card, .about-content, .about-image');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to add animation class when element is in viewport
    function checkViewport() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize animation styles
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('load', checkViewport);
    window.addEventListener('scroll', checkViewport);
});

// Add CSS for form validation
document.head.insertAdjacentHTML('beforeend', `
<style>
    .error-message {
        color: red;
        font-size: 12px;
        margin-top: 5px;
    }
    
    input:invalid, textarea:invalid, select:invalid {
        border-color: red;
    }
    
    .animated {
        opacity: 1;
        transform: translateY(0);
    }
</style>
`);
