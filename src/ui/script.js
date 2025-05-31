// Smooth scrolling for navigation links
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

// Animated particle system
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.particleCount = 50;
        this.init();
    }

    init() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;

        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 10;
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const speed = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.5 + 0.3;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, #FFD700, #FF8C00);
            border-radius: 50%;
            opacity: ${opacity};
            pointer-events: none;
            z-index: -1;
        `;
        
        container.appendChild(particle);
        this.animateParticle(particle, speed);
    }

    animateParticle(particle, speed) {
        let y = parseFloat(particle.style.top);
        
        const animate = () => {
            y -= speed;
            particle.style.top = y + 'px';
            
            // Reset particle when it goes off screen
            if (y < -10) {
                y = window.innerHeight + 10;
                particle.style.left = Math.random() * window.innerWidth + 'px';
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Neural network animation
class NeuralNetwork {
    constructor() {
        this.init();
    }

    init() {
        const nodes = document.querySelectorAll('.node');
        const connections = document.querySelectorAll('.connection');
        
        // Add pulsing effect to nodes
        nodes.forEach((node, index) => {
            setInterval(() => {
                node.style.transform = `scale(${1 + Math.sin(Date.now() * 0.001 + index) * 0.2})`;
            }, 50);
        });

        // Animate connections with data flow effect
        connections.forEach((connection, index) => {
            this.animateConnection(connection, index);
        });
    }

    animateConnection(connection, index) {
        const originalBackground = connection.style.background;
        let position = 0;
        
        setInterval(() => {
            position = (position + 2) % 100;
            connection.style.background = `linear-gradient(90deg, 
                transparent ${position}%, 
                #FFD700 ${position + 10}%, 
                transparent ${position + 20}%)`;
        }, 50 + index * 20);
    }
}

// Typing effect for hero text
class TypingEffect {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.element.innerHTML = '';
        this.type();
    }

    type() {
        if (this.currentIndex < this.text.length) {
            this.element.innerHTML += this.text.charAt(this.currentIndex);
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Interactive form handling
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        this.showSuccess();
    }

    showSuccess() {
        const submitBtn = document.querySelector('.contact-form .btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Message Envoyé!';
        submitBtn.style.background = 'linear-gradient(135deg, #32CD32, #228B22)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all feature cards and sections
        document.querySelectorAll('.feature-card, .model-card, .section-title').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(el);
        });
    }
}

// Cursor trail effect
class CursorTrail {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 10;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    handleMouseMove(e) {
        this.trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }
        
        this.updateTrail();
    }

    updateTrail() {
        // Remove old trail elements
        document.querySelectorAll('.cursor-trail').forEach(el => el.remove());
        
        // Create new trail elements
        this.trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'cursor-trail';
            trailElement.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                width: ${4 - index * 0.3}px;
                height: ${4 - index * 0.3}px;
                background: radial-gradient(circle, #FFD700, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${(this.maxTrailLength - index) / this.maxTrailLength};
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(trailElement);
            
            // Remove after animation
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.parentNode.removeChild(trailElement);
                }
            }, 500);
        });
    }
}

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    new NeuralNetwork();
    new FormHandler();
    new ScrollAnimations();
    new CursorTrail();
    
    // Add glitch effect to HLNA logo on hover
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        logo.addEventListener('animationend', () => {
            logo.style.animation = '';
        });
    }
});

// Add glitch keyframes via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(style);

// Performance optimization: throttle scroll events
function throttle(func, wait) {
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

// Add parallax effect to hero section
const heroParallax = throttle(() => {
    const scrolled = window.pageYOffset;
    const parallaxElement = document.querySelector('.hero-visual');
    if (parallaxElement) {
        parallaxElement.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
}, 10);

window.addEventListener('scroll', heroParallax);
