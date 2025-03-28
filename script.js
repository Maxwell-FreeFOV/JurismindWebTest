
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

// 添加鼠标跟随效果
document.addEventListener('mousemove', function(e) {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-trail');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 1000);
});

// 添加点击火花效果
function createSparkles(x, y) {
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.background = `hsl(${Math.random() * 60 + 180}, 100%, 70%)`;
        sparkle.style.transform = `rotate(${Math.random() * 360}deg)`;
        sparkle.style.width = `${Math.random() * 10 + 5}px`;
        sparkle.style.height = `${Math.random() * 3 + 1}px`;
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 5 + 2;
        const xVelocity = Math.cos(angle) * velocity;
        const yVelocity = Math.sin(angle) * velocity;
        
        document.body.appendChild(sparkle);
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        let size = 1;
        
        const animate = () => {
            posX += xVelocity;
            posY += yVelocity;
            opacity -= 0.02;
            size -= 0.01;
            
            sparkle.style.left = posX + 'px';
            sparkle.style.top = posY + 'px';
            sparkle.style.opacity = opacity;
            sparkle.style.transform = `rotate(${angle}rad) scale(${size})`;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                sparkle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

document.addEventListener('click', function(e) {
    createSparkles(e.clientX, e.clientY);
});

// 添加视差滚动效果
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const aboutImage = document.querySelector('.about-image-inner');
    const particles = document.querySelectorAll('.particle');
    
    if (aboutImage) {
        aboutImage.style.transform = `rotateY(${scrollPosition * 0.1}deg) rotateX(${-scrollPosition * 0.05}deg)`;
    }
    
    particles.forEach(particle => {
        const speed = parseFloat(particle.getAttribute('data-speed')) || 0.5;
        particle.style.transform = `translateY(${scrollPosition * speed * 0.2}px)`;
    });
});