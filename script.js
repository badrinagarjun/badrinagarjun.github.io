// Dark Theme Portfolio - Interactive Functionality

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scroll with Offset for Fixed Navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Skills Tabs Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const tabName = btn.getAttribute('data-tab');
        document.getElementById(tabName).classList.add('active');
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link with pre-filled content
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:your-email@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    contactForm.reset();
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// Observe project cards for staggered animations
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Active Navigation Link on Scroll
const navLinksForScroll = document.querySelectorAll('.nav-link');
const sectionsForScroll = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sectionsForScroll.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksForScroll.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--text-primary)';
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Typing Effect for Hero Title (Optional Enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle && heroTitle.textContent.includes("I'm a developer")) {
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let charIndex = 0;
    const typeSpeed = 30;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            heroTitle.innerHTML += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typeSpeed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
    });
}

// Add Copy to Clipboard for Email
const emailLink = document.querySelector('.contact-item a[href^="mailto"]');
if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        const email = emailLink.textContent;
        
        // Copy to clipboard
        navigator.clipboard.writeText(email).then(() => {
            // Create a temporary tooltip
            const tooltip = document.createElement('span');
            tooltip.textContent = 'Email copied!';
            tooltip.style.cssText = `
                position: absolute;
                background: var(--accent);
                color: var(--bg-primary);
                padding: 0.5rem 1rem;
                border-radius: 4px;
                font-size: 0.875rem;
                font-weight: 600;
                pointer-events: none;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            emailLink.parentElement.style.position = 'relative';
            emailLink.parentElement.appendChild(tooltip);
            
            // Position tooltip
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
            
            // Remove tooltip after 2 seconds
            setTimeout(() => {
                tooltip.style.opacity = '0';
                setTimeout(() => tooltip.remove(), 300);
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email:', err);
        });
    });
}

// Keyboard Navigation for Tabs
tabBtns.forEach((btn, index) => {
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = (index + 1) % tabBtns.length;
            tabBtns[nextIndex].click();
            tabBtns[nextIndex].focus();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = (index - 1 + tabBtns.length) % tabBtns.length;
            tabBtns[prevIndex].click();
            tabBtns[prevIndex].focus();
        }
    });
});

// Form Validation
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = '#ff4444';
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            input.style.borderColor = '#ff4444';
        } else {
            input.style.borderColor = 'var(--border)';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--accent)';
    });
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Prevent form submission if validation fails
contactForm.addEventListener('submit', (e) => {
    let isValid = true;
    
    formInputs.forEach(input => {
        if (input.value.trim() === '') {
            input.style.borderColor = '#ff4444';
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            input.style.borderColor = '#ff4444';
            isValid = false;
        }
    });
    
    if (!isValid) {
        e.preventDefault();
        alert('Please fill in all fields correctly.');
    }
});

// Console Message (Easter Egg)
console.log('%cHey there! 👋', 'font-size: 20px; font-weight: bold; color: #00ff88;');
console.log('%cLike what you see? Let\'s connect!', 'font-size: 14px; color: #a0a0a0;');
console.log('%cGitHub: https://github.com/badrinagarjun', 'font-size: 12px; color: #00ff88;');
