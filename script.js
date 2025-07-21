// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Simple form validation
            const name = formObject.name?.trim();
            const email = formObject.email?.trim();
            const message = formObject.message?.trim();
            const subject = formObject.subject?.trim();

            if (!name || !email || !message || !subject) {
                alert('Please fill in all required fields.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Submit to backend
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Send to Python backend
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    this.reset();
                } else {
                    alert(data.error || 'Something went wrong. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Something went wrong. Please try again.');
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }

    // Add animation on scroll for menu items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe menu items for animation
    document.querySelectorAll('.menu-item, .highlight-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Load bakery hours and status
    loadBakeryStatus();
});

// Load bakery open/closed status
function loadBakeryStatus() {
    fetch('/api/hours')
        .then(response => response.json())
        .then(data => {
            updateBakeryStatus(data);
        })
        .catch(error => {
            console.log('Could not load bakery status:', error);
        });
}

// Update the UI with bakery status
function updateBakeryStatus(data) {
    // Add status indicator to the navbar
    const navbar = document.querySelector('.nav-container');
    if (navbar && !document.querySelector('.status-indicator')) {
        const statusDiv = document.createElement('div');
        statusDiv.className = 'status-indicator';
        statusDiv.innerHTML = `
            <span class="status-dot ${data.is_open ? 'open' : 'closed'}"></span>
            <span class="status-text">${data.is_open ? 'Open Now' : 'Closed'}</span>
        `;
        navbar.appendChild(statusDiv);
    }
}

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add CSS for form styling
const additionalCSS = `
.contact-form {
    background: #f8f5f0;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #2c1810;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #d4a574;
    box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.1);
}

.form-group textarea {
    resize: vertical;
    min-height: 120px;
}

.contact-info-text h4 {
    color: #d4a574;
    margin-top: 30px;
    margin-bottom: 10px;
}

.map-placeholder {
    background: #f0f0f0;
    padding: 40px;
    border-radius: 15px;
    text-align: center;
    border: 2px dashed #d4a574;
}

.map-placeholder h4 {
    color: #2c1810;
    margin-bottom: 20px;
    font-family: 'Playfair Display', serif;
}

.map-placeholder ul {
    text-align: left;
    list-style: none;
    margin-top: 20px;
}

.map-placeholder ul li {
    padding: 5px 0;
}

.social-links {
    text-align: center;
    margin-top: 20px;
}

.directions h4 {
    color: #d4a574;
    margin-top: 30px;
    margin-bottom: 10px;
}

.hamburger.active .bar:nth-child(2) {
    opacity: 0;
}

.hamburger.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.hamburger.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 15px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
}

.status-dot.open {
    background: #4CAF50;
    box-shadow: 0 0 6px rgba(76, 175, 80, 0.6);
}

.status-dot.closed {
    background: #f44336;
    box-shadow: 0 0 6px rgba(244, 67, 54, 0.6);
}

.status-text {
    color: white;
    font-family: 'Poppins', sans-serif;
}

@media (max-width: 768px) {
    .status-indicator {
        display: none;
    }
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style); 