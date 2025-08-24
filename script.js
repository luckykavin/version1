// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const mobileNavBtn = document.getElementById('mobileNavBtn');
const mobileNavDropdown = document.getElementById('mobileNavDropdown');
const mobileNavOptions = document.querySelectorAll('.mobile-nav-option');
const tabContents = document.querySelectorAll('.tab-content');
const joinForm = document.getElementById('joinForm');
const langToggle = document.getElementById('langToggle');
const langDropdown = document.getElementById('langDropdown');
const currentLang = document.getElementById('currentLang');
const slideshowModal = document.getElementById('slideshowModal');
const modalClose = document.getElementById('modalClose');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
// const heroImage = document.querySelector('.hero-img.img-1');

// Language System
let currentLanguage = 'en';

const translations = {
    en: {
        // Form placeholders
        'skills-placeholder': 'List your programming languages, frameworks, tools, and any relevant skills...',
        'motivation-placeholder': 'Tell us what excites you about this project...',
        'portfolio-placeholder': 'https://github.com/username or portfolio website'
    },
    fr: {
        // Form placeholders
        'skills-placeholder': 'Listez vos langages de programmation, frameworks, outils et toutes compétences pertinentes...',
        'motivation-placeholder': 'Dites-nous ce qui vous enthousiasme dans ce projet...',
        'portfolio-placeholder': 'https://github.com/username ou site portfolio'
    }
};

// Language Switching Functionality
function switchLanguage(lang) {
    currentLanguage = lang;
    currentLang.textContent = lang.toUpperCase();
    
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-en][data-fr]');
    elements.forEach(element => {
        if (element.dataset[lang]) {
            element.textContent = element.dataset[lang];
        }
    });
    
    // Update form placeholders
    const skillsTextarea = document.getElementById('skills');
    const motivationTextarea = document.getElementById('motivation');
    const portfolioInput = document.getElementById('portfolio');
    
    if (skillsTextarea) {
        skillsTextarea.placeholder = translations[lang]['skills-placeholder'];
    }
    if (motivationTextarea) {
        motivationTextarea.placeholder = translations[lang]['motivation-placeholder'];
    }
    if (portfolioInput) {
        portfolioInput.placeholder = translations[lang]['portfolio-placeholder'];
    }
    
    // Update select options
    const roleSelect = document.getElementById('role');
    const experienceSelect = document.getElementById('experience');
    
    if (roleSelect) {
        Array.from(roleSelect.options).forEach(option => {
            if (option.dataset[lang]) {
                option.textContent = option.dataset[lang];
            }
        });
    }
    
    if (experienceSelect) {
        Array.from(experienceSelect.options).forEach(option => {
            if (option.dataset[lang]) {
                option.textContent = option.dataset[lang];
            }
        });
    }
    
    // Hide dropdown
    langDropdown.classList.remove('show');
    
    // Save language preference
    localStorage.setItem('preferred-language', lang);
}

// Mobile Navigation Toggle
mobileNavBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileNavDropdown.classList.toggle('show');
});

// Mobile Navigation Option Selection
mobileNavOptions.forEach(option => {
    option.addEventListener('click', () => {
        const tabId = option.getAttribute('data-tab');
        switchTab(tabId);
        
        // Update active state
        mobileNavOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Hide dropdown
        mobileNavDropdown.classList.remove('show');
        
        // Add click animation
        option.style.transform = 'scale(0.95)';
        setTimeout(() => {
            option.style.transform = '';
        }, 150);
    });
});

// Close mobile dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-nav-btn') && !e.target.closest('.mobile-nav-dropdown')) {
        mobileNavDropdown.classList.remove('show');
    }
});

// Language dropdown toggle
langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('show');
});

// Language option selection
document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', () => {
        const lang = option.dataset.lang;
        switchLanguage(lang);
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-selector')) {
        langDropdown.classList.remove('show');
    }
});

// Slideshow Functionality
let currentSlide = 0;

// // Open slideshow modal when clicking on hero image
// heroImage.addEventListener('click', () => {
//     slideshowModal.classList.add('show');
//     document.body.style.overflow = 'hidden';
//     showSlide(currentSlide);
// });

// // Close modal
// modalClose.addEventListener('click', () => {
//     slideshowModal.classList.remove('show');
//     document.body.style.overflow = '';
// });

// // Close modal when clicking outside
// slideshowModal.addEventListener('click', (e) => {
//     if (e.target === slideshowModal) {
//         slideshowModal.classList.remove('show');
//         document.body.style.overflow = '';
//     }
// });

// // Navigation buttons
// prevBtn.addEventListener('click', () => {
//     currentSlide = (currentSlide - 1 + slides.length) % slides.length;
//     showSlide(currentSlide);
// });

// nextBtn.addEventListener('click', () => {
//     currentSlide = (currentSlide + 1) % slides.length;
//     showSlide(currentSlide);
// });

// Indicator clicks
// indicators.forEach((indicator, index) => {
//     indicator.addEventListener('click', () => {
//         currentSlide = index;
//         showSlide(currentSlide);
//     });
// });

// // Show specific slide
// function showSlide(index) {
//     slides.forEach((slide, i) => {
//         slide.classList.toggle('active', i === index);
//     });
    
//     indicators.forEach((indicator, i) => {
//         indicator.classList.toggle('active', i === index);
//     });
    
//     // Update button states
//     prevBtn.disabled = index === 0;
//     nextBtn.disabled = index === slides.length - 1;
// }

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (slideshowModal.classList.contains('show')) {
        if (e.key === 'Escape') {
            slideshowModal.classList.remove('show');
            document.body.style.overflow = '';
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    }
});

// Initialize language from localStorage or default to English
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    switchLanguage(savedLang);
});

// Tab Switching Functionality
function switchTab(tabId) {
    // Remove active class from all tabs and buttons
    tabContents.forEach(tab => tab.classList.remove('active'));
    navButtons.forEach(btn => btn.classList.remove('active'));
    mobileNavOptions.forEach(opt => opt.classList.remove('active'));
    
    // Add active class to selected tab and button
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.querySelector(`.mobile-nav-option[data-tab="${tabId}"]`).classList.add('active');
    
    // Smooth scroll to top of content
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Event Listeners for Navigation
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        switchTab(tabId);
        
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    });
});

// Form Submission Handler
joinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = joinForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual backend integration)
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        const successMessage = currentLanguage === 'fr' 
            ? 'Candidature soumise avec succès ! Nous vous recontacterons bientôt.' 
            : 'Application submitted successfully! We\'ll get back to you soon.';
        showNotification(successMessage, 'success');
        
        // Reset form
        joinForm.reset();
        
        // Switch to info tab to show success
        switchTab('info');
        
    } catch (error) {
        const errorMessage = currentLanguage === 'fr' 
            ? 'Quelque chose s\'est mal passé. Veuillez réessayer.' 
            : 'Something went wrong. Please try again.';
        showNotification(errorMessage, 'error');
    } finally {
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 
                    type === 'error' ? 'linear-gradient(135deg, #f44336, #da190b)' : 
                    'linear-gradient(135deg, #2196F3, #1976D2)'};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Add notification styles to head
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: background 0.2s;
            }
            
            .notification-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    });
}

// Smooth animations for elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.info-card, .guidelines-section, .form-container');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add subtle hover effects to form inputs
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Add parallax effect to hero images
    const heroImages = document.querySelectorAll('.hero-img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        heroImages.forEach((img, index) => {
            img.style.transform = `translateY(${rate * (index + 1) * 0.1}px)`;
        });
    });
});

// Smooth scroll for anchor links
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

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.shiftKey === false) {
        // Handle tab navigation
        const activeTab = document.querySelector('.nav-btn.active');
        const currentIndex = Array.from(navButtons).indexOf(activeTab);
        const nextIndex = (currentIndex + 1) % navButtons.length;
        
        if (e.target.closest('.nav')) {
            e.preventDefault();
            switchTab(navButtons[nextIndex].getAttribute('data-tab'));
        }
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.animation = 'fadeIn 0.5s ease-out';
        });
        
        img.addEventListener('error', () => {
            img.style.filter = 'grayscale(100%)';
            img.style.opacity = '0.5';
        });
    });
});

// Add CSS for image loading animation
if (!document.querySelector('#image-styles')) {
    const style = document.createElement('style');
    style.id = 'image-styles';
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        img {
            opacity: 0;
            animation: fadeIn 0.5s ease-out forwards;
        }
    `;
    document.head.appendChild(style);
}

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll-based animations here
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

// Add touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const currentTab = document.querySelector('.nav-btn.active');
        const currentIndex = Array.from(navButtons).indexOf(currentTab);
        
        if (diff > 0 && currentIndex < navButtons.length - 1) {
            // Swipe left - next tab
            switchTab(navButtons[currentIndex + 1].getAttribute('data-tab'));
        } else if (diff < 0 && currentIndex > 0) {
            // Swipe right - previous tab
            switchTab(navButtons[currentIndex - 1].getAttribute('data-tab'));
        }
    }
}
