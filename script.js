// Modern JavaScript with enhanced features and performance
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main app initialization
function initializeApp() {
    initMobileNavigation();
    initScrollEffects();
    initSmoothScrolling();
    initFormHandling();
    initAnimations();
    initParallaxEffects();
    initPerformanceOptimizations();
}

// Enhanced Mobile Navigation with modern patterns
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    // Toggle mobile menu with modern animation
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    });

    // Close menu when clicking outside (modern event delegation)
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Enhanced scroll behavior for navbar
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for styling
        navbar.classList.toggle('scrolled', currentScrollY > 50);
        
        // Hide/show navbar on scroll (mobile)
        if (window.innerWidth <= 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }

    function requestNavbarUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestNavbarUpdate, { passive: true });
    window.addEventListener('resize', requestNavbarUpdate, { passive: true });

    function toggleMobileMenu() {
        const isActive = hamburger.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate menu items
        const menuItems = navMenu.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('menu-item-enter');
        });
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clean up animations
        const menuItems = navMenu.querySelectorAll('li');
        menuItems.forEach(item => {
            item.classList.remove('menu-item-enter');
            item.style.animationDelay = '';
        });
    }
}

// Enhanced smooth scrolling with modern techniques
function initSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Page navigation with smooth transitions
    const navLinks = document.querySelectorAll('.nav-link[href$=".html"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname !== window.location.hostname) return;
            
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Fade out effect
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

// Modern scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                
                // Stagger animations for child elements
                const children = entry.target.querySelectorAll('.highlight-item, .menu-item, .contact-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                // Unobserve after animation to improve performance
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.section, .highlight-item, .menu-item, .contact-item, .intro-grid, .about-grid'
    );
    
    animateElements.forEach(el => {
        // Initial state for animations
        if (el.classList.contains('highlight-item') || 
            el.classList.contains('menu-item') || 
            el.classList.contains('contact-item')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        animationObserver.observe(el);
    });

    // Parallax scrolling effect
    const parallaxElements = document.querySelectorAll('.hero, .page-hero');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }

    let parallaxTicking = false;
    function requestParallaxUpdate() {
        if (!parallaxTicking) {
            requestAnimationFrame(updateParallax);
            parallaxTicking = true;
            setTimeout(() => { parallaxTicking = false; }, 16);
        }
    }

    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
}

// Enhanced form handling with modern validation
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmission);
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', debounce(validateField, 300));
        });
    });

    async function handleFormSubmission(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        
        // Validate entire form
        const isValid = validateForm(form);
        if (!isValid) return;
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        try {
            // Simulate API call with modern async/await
            await simulateFormSubmission(formObject);
            
            // Success state
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            clearValidationStates(form);
            
        } catch (error) {
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    }

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const fieldType = field.type;
        const isRequired = field.hasAttribute('required');
        
        clearFieldError(field);
        
        if (isRequired && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (fieldType === 'email' && value && !isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        if (fieldType === 'tel' && value && !isValidPhone(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
        
        showFieldSuccess(field);
        return true;
    }

    function validateForm(form) {
        const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        fields.forEach(field => {
            if (!validateField({ target: field })) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.opacity = '1';
    }

    function showFieldSuccess(field) {
        field.classList.remove('error');
        field.classList.add('success');
    }

    function clearFieldError(field) {
        field.classList.remove('error', 'success');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.opacity = '0';
            setTimeout(() => errorElement.remove(), 300);
        }
    }

    function clearValidationStates(form) {
        const fields = form.querySelectorAll('input, textarea, select');
        fields.forEach(clearFieldError);
    }
}

// Modern animations and micro-interactions
function initAnimations() {
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.cta-button, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', createRippleEffect);
        button.addEventListener('click', createClickEffect);
    });

    // Card hover effects
    const cards = document.querySelectorAll('.menu-item, .highlight-item, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = card.dataset.originalTransform || '';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.dataset.originalTransform) {
                card.dataset.originalTransform = card.style.transform;
            }
        });
    });

    // Image lazy loading with modern Intersection Observer
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    function createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    function createClickEffect(e) {
        const button = e.currentTarget;
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
}

// Parallax and advanced visual effects
function initParallaxEffects() {
    // Modern parallax with transform3d for better performance
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }

    let parallaxFrame;
    function handleParallaxScroll() {
        if (parallaxFrame) cancelAnimationFrame(parallaxFrame);
        parallaxFrame = requestAnimationFrame(updateParallax);
    }

    window.addEventListener('scroll', handleParallaxScroll, { passive: true });

    // Floating animations for decorative elements
    const floatingElements = document.querySelectorAll('.hero::before, .page-hero::before');
    
    floatingElements.forEach((element, index) => {
        const duration = 15 + (index * 5);
        element.style.animationDuration = `${duration}s`;
    });
}

// Performance optimizations and modern techniques
function initPerformanceOptimizations() {
    // Preload critical resources
    preloadCriticalResources();
    
    // Optimize scroll performance
    optimizeScrollPerformance();
    
    // Cache DOM queries
    cacheDOMQueries();
    
    // Service worker registration (if available)
    registerServiceWorker();
}

function preloadCriticalResources() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1509440159596-0249088772ff',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

function optimizeScrollPerformance() {
    // Passive event listeners for better scroll performance
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            // Trigger any scroll-end events
            document.dispatchEvent(new CustomEvent('scrollend'));
        }, 100);
    }, { passive: true });
}

function cacheDOMQueries() {
    // Cache frequently accessed DOM elements
    window.APP_CACHE = {
        navbar: document.querySelector('.navbar'),
        hero: document.querySelector('.hero'),
        mobileMenu: document.querySelector('.nav-menu'),
        hamburger: document.querySelector('.hamburger')
    };
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker registration failed, continue silently
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

async function simulateFormSubmission(formData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate random success/failure for demo
    if (Math.random() > 0.1) {
        return { success: true, message: 'Form submitted successfully' };
    } else {
        throw new Error('Submission failed');
    }
}

function showNotification(message, type = 'info') {
    // Create modern notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">${type === 'success' ? '✓' : '!'}</span>
            <span class="notification__message">${message}</span>
            <button class="notification__close" aria-label="Close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.classList.add('notification--show');
    });
    
    // Auto remove
    const removeNotification = () => {
        notification.classList.remove('notification--show');
        setTimeout(() => notification.remove(), 300);
    };
    
    // Close button
    notification.querySelector('.notification__close').addEventListener('click', removeNotification);
    
    // Auto-remove after 5 seconds
    setTimeout(removeNotification, 5000);
}

// Enhanced CSS for modern features
const enhancedCSS = `
/* Modern Navigation Menu Animations */
.nav-menu li.menu-item-enter {
    animation: menuItemSlideIn 0.3s ease-out forwards;
}

@keyframes menuItemSlideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Enhanced Form Styling */
.form-group {
    position: relative;
}

.form-group input.error,
.form-group textarea.error,
.form-group select.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-group input.success,
.form-group textarea.success,
.form-group select.success {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    transition: opacity 0.3s ease;
    opacity: 0;
}

/* Ripple Effect */
.cta-button, .btn-secondary {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: rippleEffect 0.6s linear;
    pointer-events: none;
}

@keyframes rippleEffect {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

/* Modern Notifications */
.notification {
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    padding: 1rem 1.5rem;
    max-width: 400px;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0;
    border-left: 4px solid var(--primary-500);
}

.notification--show {
    transform: translateX(0);
    opacity: 1;
}

.notification--success {
    border-left-color: #10b981;
}

.notification--error {
    border-left-color: #ef4444;
}

.notification__content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.notification__icon {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
    font-size: 0.875rem;
}

.notification--success .notification__icon {
    background: #10b981;
}

.notification--error .notification__icon {
    background: #ef4444;
}

.notification__message {
    flex: 1;
    color: var(--neutral-700);
    font-size: 0.875rem;
}

.notification__close {
    background: none;
    border: none;
    font-size: 1.25rem;
    color: var(--neutral-400);
    cursor: pointer;
    padding: 0;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    transition: all 0.2s ease;
}

.notification__close:hover {
    color: var(--neutral-600);
    background: var(--neutral-100);
}

/* Loading States */
.loading {
    position: relative;
    overflow: hidden;
}

.loading::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: loadingShimmer 1.5s infinite;
}

@keyframes loadingShimmer {
    to {
        left: 100%;
    }
}

/* Enhanced Mobile Menu */
@media (max-width: 768px) {
    .nav-menu {
        backdrop-filter: blur(20px) saturate(180%);
        border-radius: 0 0 1.5rem 1.5rem;
    }
    
    .navbar {
        transition: transform 0.3s ease;
    }
}

/* Image Loading Animation */
img {
    transition: opacity 0.3s ease;
}

img.loaded {
    opacity: 1;
}

img:not(.loaded) {
    opacity: 0;
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
    .notification {
        transition: none;
    }
    
    .ripple {
        display: none;
    }
    
    .nav-menu li.menu-item-enter {
        animation: none;
    }
}
`;

// Inject enhanced CSS
const styleElement = document.createElement('style');
styleElement.textContent = enhancedCSS;
document.head.appendChild(styleElement); 