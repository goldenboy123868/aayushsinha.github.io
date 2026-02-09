// Smooth scroll for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

// Highlight active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add fade-in animation to elements when they come into view
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

// Observe project cards and skill categories
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category');
    animateElements.forEach(el => observer.observe(el));
});

// Add shadow to navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }
});

// Optional: Log when page is fully loaded
window.addEventListener('load', () => {
    console.log('Portfolio loaded successfully!');
});

// Toggle Read More functionality
function toggleReadMore(button) {
    const projectCard = button.closest('.project-card');
    const moreDetails = projectCard.querySelector('.project-more-details');
    
    if (moreDetails.style.display === 'none') {
        moreDetails.style.display = 'block';
        button.textContent = 'Read Less';
    } else {
        moreDetails.style.display = 'none';
        button.textContent = 'Read More';
    }
} 

// Carousel functionality
let carouselIndexes = {}; // Store current index for each modal

function changeSlide(modalId, direction) {
    const modal = document.getElementById(modalId);
    const images = modal.querySelectorAll('.carousel-image');
    const dots = modal.querySelectorAll('.dot');
    
    // Initialize index if not exists
    if (!carouselIndexes[modalId]) {
        carouselIndexes[modalId] = 0;
    }
    
    // Remove active class from current image and dot
    images[carouselIndexes[modalId]].classList.remove('active');
    dots[carouselIndexes[modalId]].classList.remove('active');
    
    // Update index
    carouselIndexes[modalId] += direction;
    
    // Wrap around
    if (carouselIndexes[modalId] >= images.length) {
        carouselIndexes[modalId] = 0;
    }
    if (carouselIndexes[modalId] < 0) {
        carouselIndexes[modalId] = images.length - 1;
    }
    
    // Add active class to new image and dot
    images[carouselIndexes[modalId]].classList.add('active');
    dots[carouselIndexes[modalId]].classList.add('active');
}

function currentSlide(modalId, index) {
    const modal = document.getElementById(modalId);
    const images = modal.querySelectorAll('.carousel-image');
    const dots = modal.querySelectorAll('.dot');
    
    // Remove active from all
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Set to clicked index
    carouselIndexes[modalId] = index;
    images[index].classList.add('active');
    dots[index].classList.add('active');
}

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Reset carousel to first image
    carouselIndexes[modalId] = 0;
    const modal = document.getElementById(modalId);
    const images = modal.querySelectorAll('.carousel-image');
    const dots = modal.querySelectorAll('.dot');
    
    images.forEach((img, i) => {
        img.classList.remove('active');
        if (i === 0) img.classList.add('active');
    });
    
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === 0) dot.classList.add('active');
    });
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('project-modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.project-modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Arrow key navigation for carousel
    const openModal = document.querySelector('.project-modal[style*="display: block"]');
    if (openModal) {
        const modalId = openModal.id;
        
        if (event.key === 'ArrowLeft') {
            changeSlide(modalId, -1);
        } else if (event.key === 'ArrowRight') {
            changeSlide(modalId, 1);
        }
    }

    
});

function copyEmail() {
    const email = "aayusharyaman@gmail.com";

    navigator.clipboard.writeText(email).then(() => {
        const toast = document.getElementById("toast");
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2000);
    }).catch(err => {
        console.error("Clipboard failed:", err);
    });
}
