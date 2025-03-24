// Portfolio Filter
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.portfolio-filter button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Add your filtering logic here
            const category = this.textContent.toLowerCase();
            filterPortfolioItems(category);
        });
    });

    // Active section detection
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveSection() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Initial check for active section
    setActiveSection();

    // Check active section on scroll
    window.addEventListener('scroll', setActiveSection);

    // Smooth scroll with active state update
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });

            // Update active state
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add typing animation to hero title
    setupMultiLineTyping();
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
    });
}

// Portfolio Item Filter Function
function filterPortfolioItems(category) {
    const items = document.querySelectorAll('.portfolio-item');
    items.forEach(item => {
        if (category === 'all') {
            item.style.display = 'block';
        } else {
            item.style.display = item.dataset.category === category ? 'block' : 'none';
        }
    });
}

// Typing Animation Function
function setupMultiLineTyping() {
    const lines = document.querySelectorAll('.typing-container h1');
    const texts = Array.from(lines).map(line => line.textContent);
    
    lines.forEach((line, index) => {
        line.textContent = '';
        
        let isDeleting = false;
        let txtIndex = 0;
        let timeOut = 100;

        function typeLine() {
            const currentText = texts[index].substring(0, txtIndex);
            line.textContent = currentText;

            if (!isDeleting && txtIndex < texts[index].length) {
                txtIndex++;
                timeOut = 100;
            } else if (!isDeleting && txtIndex === texts[index].length) {
                isDeleting = true;
                timeOut = 2000;
            } else if (isDeleting && txtIndex > 0) {
                txtIndex--;
                timeOut = 50;
            } else if (isDeleting && txtIndex === 0) {
                isDeleting = false;
                timeOut = 1000;
            }

            setTimeout(typeLine, timeOut);
        }

        setTimeout(() => typeLine(), index * 2000); // Delay between lines
    });
}

// Smooth reveal animation for sections
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-hidden');
    observer.observe(section);
});

// Add smooth scrolling and close sidebar on mobile
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
            // Add mobile navigation handling if needed
        }
    });
}); 