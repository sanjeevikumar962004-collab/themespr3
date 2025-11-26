// Initialize Lucide Icons
lucide.createIcons();

// --- Mobile Menu Toggle ---
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenu.classList.contains('hidden') ? 'menu' : 'x';
        mobileBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
        lucide.createIcons();
    });
}

// --- Navbar Scroll Effect ---
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// --- FAQ Accordion ---
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
        });

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// --- Stats Counter Animation ---
const counters = document.querySelectorAll('.counter');
const statsSection = document.getElementById('stats-section');
let started = false;

function startCounting() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || '';
        const decimals = +counter.getAttribute('data-decimals') || 0;
        
        const duration = 2000; 
        const increment = target / (duration / 16); 
        
        let c = 0;
        const updateCounter = () => {
            c += increment;
            if (c < target) {
                counter.innerText = c.toFixed(decimals) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target.toFixed(decimals) + suffix;
            }
        };
        updateCounter();
    });
}

if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                startCounting();
                started = true;
            }
        });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}

// --- Authentication Pages Logic ---

// 1. Password Eye Toggle
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        icon.setAttribute('data-lucide', 'eye-off'); 
        // Re-render icons if needed in specific environment, mostly CSS handles visuals or manual class toggle
        // For this simple setup, we assume icon click works. 
    } else {
        input.type = "password";
        icon.setAttribute('data-lucide', 'eye');
    }
    lucide.createIcons();
}

// 2. Sign Up Form Password Validation
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const errorMsg = document.getElementById('password-error');

        if (password !== confirmPassword) {
            if (errorMsg) {
                errorMsg.style.display = 'block';
                // Re-initialize icon inside error message if needed
                lucide.createIcons();
            }
            return; // Stop here
        } else {
            if (errorMsg) errorMsg.style.display = 'none';
            // Redirect to error page if passwords match
            window.location.href = 'error.html';
        }
    });
}

// 3. General Form Handler (Login, Forgot Password, Contact)
// We exclude signupForm since it has its own handler above
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    if (form.id !== 'signupForm') {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            window.location.href = 'error.html';
        });
    }
});



// --- Mobile Dropdown Toggle ---
const mobileHomeToggle = document.getElementById('mobile-home-toggle');
const mobileHomeSubmenu = document.getElementById('mobile-home-submenu');

if (mobileHomeToggle && mobileHomeSubmenu) {
    mobileHomeToggle.addEventListener('click', (e) => {
        // Prevent bubbling if needed
        e.stopPropagation(); 
        
        // Toggle the hidden class
        mobileHomeSubmenu.classList.toggle('hidden');
        
        // Rotate the icon based on state
        const icon = mobileHomeSubmenu.classList.contains('hidden') ? 'chevron-down' : 'chevron-up';
        mobileHomeToggle.innerHTML = `<i data-lucide="${icon}"></i>`;
        lucide.createIcons();
    });
}