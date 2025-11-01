/**
 * Vibrant Theme Scripts
 * Advanced interactive features for the vibrant theme
 */

class VibrantTheme {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupThemeToggle();
    this.setupSmoothScrolling();
    this.setupScrollEffects();
    this.setupAnimations();
    this.setupParallax();
    this.setupParticles();
    this.handleInitialTheme();
    this.setupKeyboardNavigation();
  }

  /**
   * Setup navigation functionality
   */
  setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');

    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
      
      // Hide/show navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', this.throttle(handleScroll, 10));

    // Mobile menu toggle
    if (navbarToggle && navbarMenu) {
      navbarToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('navbar__menu--active');
        navbarToggle.classList.toggle('navbar__toggle--active');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
          navbarMenu.classList.remove('navbar__menu--active');
          navbarToggle.classList.remove('navbar__toggle--active');
        }
      });
    }

    // Active link highlighting
    const navLinks = document.querySelectorAll('.navbar__link');
    const sections = document.querySelectorAll('.section, .hero');

    const updateActiveLink = () => {
      const scrollPos = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('navbar__link--active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('navbar__link--active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', this.throttle(updateActiveLink, 50));
  }

  /**
   * Setup theme toggle functionality
   */
  setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Get initial theme
    const currentTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    this.setTheme(currentTheme);

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      
      this.setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Add ripple effect
      this.createRipple(themeToggle, event);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /**
   * Set theme and update toggle icon
   */
  setTheme(theme) {
    const toggleIcon = document.querySelector('.toggle-icon');
    
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (toggleIcon) toggleIcon.textContent = '☀️';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      if (toggleIcon) toggleIcon.textContent = '🌙';
    }
  }

  /**
   * Handle initial theme setup
   */
  handleInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (systemPrefersDark) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  /**
   * Setup smooth scrolling for anchor links
   */
  setupSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          const navbarMenu = document.getElementById('navbar-menu');
          const navbarToggle = document.getElementById('navbar-toggle');
          if (navbarMenu && navbarToggle) {
            navbarMenu.classList.remove('navbar__menu--active');
            navbarToggle.classList.remove('navbar__toggle--active');
          }
        }
      });
    });

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        const firstSection = document.querySelector('.section');
        if (firstSection) {
          firstSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  /**
   * Setup scroll-based effects
   */
  setupScrollEffects() {
    // Parallax effect for hero background
    const hero = document.querySelector('.hero');
    const floatingShapes = document.querySelectorAll('.floating-shape');

    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;
      
      if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
      }

      // Animate floating shapes
      floatingShapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = scrolled * speed;
        const rotation = scrolled * 0.1 * (index + 1);
        shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
      });
    };

    window.addEventListener('scroll', this.throttle(handleParallax, 10));

    // Progress indicator
    const createProgressIndicator = () => {
      const progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      progressBar.innerHTML = '<div class="scroll-progress__bar"></div>';
      document.body.appendChild(progressBar);

      const progressBarFill = progressBar.querySelector('.scroll-progress__bar');

      const updateProgress = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBarFill.style.width = `${scrollPercent}%`;
      };

      window.addEventListener('scroll', this.throttle(updateProgress, 10));
    };

    createProgressIndicator();
  }

  /**
   * Setup animations
   */
  setupAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Special handling for skill cards
          if (entry.target.classList.contains('skills__grid')) {
            const skillCards = entry.target.querySelectorAll('.skill-card');
            skillCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in');
              }, index * 100);
            });
          }

          // Special handling for project cards
          if (entry.target.classList.contains('projects__grid')) {
            const projectCards = entry.target.querySelectorAll('.project-card');
            projectCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in');
              }, index * 150);
            });
          }

          // Special handling for timeline items
          if (entry.target.classList.contains('timeline__item')) {
            entry.target.style.animationDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200}ms`;
          }
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
      '.section__header, .about__content, .skills__grid, .projects__grid, .timeline__item, .contact__content'
    );

    animateElements.forEach(el => observer.observe(el));

    // Hero animation
    this.animateHero();

    // Typing effect for hero title
    this.createTypingEffect();
  }

  /**
   * Animate hero elements
   */
  animateHero() {
    const heroElements = [
      '.hero__image-wrapper',
      '.hero__name',
      '.hero__title-wrapper', 
      '.hero__tagline',
      '.hero__location',
      '.hero__cta',
      '.hero__social'
    ];

    heroElements.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, (index * 200) + 500);
      }
    });
  }

  /**
   * Create typing effect for hero title
   */
  createTypingEffect() {
    const titleElement = document.querySelector('.hero__title');
    if (!titleElement) return;

    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    
    let charIndex = 0;
    const typingSpeed = 100;

    const typeChar = () => {
      if (charIndex < originalText.length) {
        titleElement.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, typingSpeed);
      } else {
        // Add blinking cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        titleElement.appendChild(cursor);
        
        // Remove cursor after 3 seconds
        setTimeout(() => {
          if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
          }
        }, 3000);
      }
    };

    // Start typing effect after initial animations
    setTimeout(typeChar, 1500);
  }

  /**
   * Setup parallax effects
   */
  setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    const handleParallaxScroll = () => {
      const scrollTop = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', this.throttle(handleParallaxScroll, 10));
    }
  }

  /**
   * Setup particle system
   */
  setupParticles() {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position and properties
      const startX = Math.random() * window.innerWidth;
      const startY = window.innerHeight + 10;
      const size = Math.random() * 4 + 2;
      const duration = Math.random() * 3000 + 2000;
      const color = ['#ff6b6b', '#4ecdc4', '#ffd93d'][Math.floor(Math.random() * 3)];
      
      particle.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: ${startY}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.6;
        transition: all ${duration}ms linear;
      `;
      
      document.body.appendChild(particle);
      
      // Animate particle
      setTimeout(() => {
        particle.style.top = '-10px';
        particle.style.opacity = '0';
      }, 50);
      
      // Remove particle
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, duration);
    };

    // Create particles periodically
    setInterval(createParticle, 2000);
  }

  /**
   * Setup keyboard navigation
   */
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Escape key to close mobile menu
      if (e.key === 'Escape') {
        const navbarMenu = document.getElementById('navbar-menu');
        const navbarToggle = document.getElementById('navbar-toggle');
        if (navbarMenu && navbarToggle) {
          navbarMenu.classList.remove('navbar__menu--active');
          navbarToggle.classList.remove('navbar__toggle--active');
        }
      }

      // Arrow keys for section navigation
      if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        this.navigateToNextSection();
      }

      if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        this.navigateToPrevSection();
      }
    });
  }

  /**
   * Navigate to next section
   */
  navigateToNextSection() {
    const sections = Array.from(document.querySelectorAll('.section, .hero'));
    const currentScroll = window.scrollY + 100;
    
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop > currentScroll) {
        sections[i].scrollIntoView({ behavior: 'smooth' });
        break;
      }
    }
  }

  /**
   * Navigate to previous section
   */
  navigateToPrevSection() {
    const sections = Array.from(document.querySelectorAll('.section, .hero')).reverse();
    const currentScroll = window.scrollY + 100;
    
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop < currentScroll - 50) {
        sections[i].scrollIntoView({ behavior: 'smooth' });
        break;
      }
    }
  }

  /**
   * Create ripple effect
   */
  createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  /**
   * Utility function to throttle events
   */
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Utility function to debounce events
   */
  debounce(func, wait) {
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
}

// Add required CSS for animations
const addAnimationStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      animation: fadeInUp 0.8s ease forwards;
    }

    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      z-index: 9999;
    }

    .scroll-progress__bar {
      height: 100%;
      background: linear-gradient(90deg, #ff6b6b 0%, #4ecdc4 50%, #ffd93d 100%);
      width: 0%;
      transition: width 0.1s ease;
    }

    .navbar--scrolled {
      background: rgba(255, 255, 255, 0.98) !important;
      backdrop-filter: blur(20px);
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    .navbar__link--active::after {
      width: 100% !important;
    }

    .typing-cursor {
      animation: blink 1s infinite;
      color: var(--color-primary);
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    @media (max-width: 768px) {
      .navbar__menu--active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-top: none;
        padding: var(--spacing-lg);
        gap: var(--spacing-md);
        box-shadow: var(--shadow-lg);
      }

      .navbar__toggle--active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }

      .navbar__toggle--active span:nth-child(2) {
        opacity: 0;
      }

      .navbar__toggle--active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }
    }
  `;
  document.head.appendChild(style);
};

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  addAnimationStyles();
  new VibrantTheme();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    // Refresh theme when page becomes visible
    const theme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (window.vibrantTheme) {
      window.vibrantTheme.setTheme(theme);
    }
  }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VibrantTheme;
}