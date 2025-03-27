document.addEventListener('DOMContentLoaded', function() {
    // Particle effect for header
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.6 + 0.2;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Screenshot gallery functionality
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const galleryDotsContainer = document.querySelector('.gallery-dots');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    let currentSlide = 0;
    
    // Create dots
    gallerySlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('gallery-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        galleryDotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.gallery-dot');
    
    function updateGallery() {
        gallerySlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateGallery();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % gallerySlides.length;
        updateGallery();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + gallerySlides.length) % gallerySlides.length;
        updateGallery();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-rotate gallery
    let galleryInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const gallery = document.querySelector('.gallery-container');
    gallery.addEventListener('mouseenter', () => {
        clearInterval(galleryInterval);
    });
    
    gallery.addEventListener('mouseleave', () => {
        galleryInterval = setInterval(nextSlide, 5000);
    });
    
    // Floating animation for elements with .floating class
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach(el => {
        const duration = Math.random() * 3 + 3;
        const delay = Math.random() * 2;
        el.style.animationDuration = `${duration}s`;
        el.style.animationDelay = `${delay}s`;
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});