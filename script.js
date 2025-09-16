const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

// Theme toggle event listener
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add a subtle animation effect
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
      themeToggle.style.transform = 'scale(1)';
    }, 150);
  });
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navList.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    navList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Typing animation
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
  const typingElements = document.querySelectorAll('.typing-text, .typing-line');
  const texts = [
    'const developer = {',
    '  skills: ["React", "Node.js", "Python"],',
    '  passion: "Building amazing web apps",',
    '  status: "Available for hire"',
    '};'
  ];
  
  typingElements.forEach((el, index) => {
    if (texts[index]) {
      setTimeout(() => {
        typeWriter(el, texts[index], 80);
      }, index * 200);
    }
  });
});

// Particle animation for background
function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.cssText = `
    position: fixed;
    width: 2px;
    height: 2px;
    background: linear-gradient(45deg, #3b82f6, #22d3ee);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    left: ${Math.random() * window.innerWidth}px;
    top: ${Math.random() * window.innerHeight}px;
    animation: particleFloat ${3 + Math.random() * 4}s linear infinite;
  `;
  
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 7000);
}

// Add particle animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0% {
      transform: translateY(0) translateX(0) scale(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
      transform: scale(1);
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) scale(0);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Create particles periodically
setInterval(createParticle, 2000);

// Skill card hover effects
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.background = 'linear-gradient(135deg, rgba(96,165,250,0.12), rgba(139,92,246,0.08))';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// Reveal on scroll with stagger effect
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach((el) => observer.observe(el));

// Smooth anchor offset for sticky header
const header = document.querySelector('.site-header');
function offsetScroll(ev) {
  const href = ev.currentTarget.getAttribute('href');
  if (!href || !href.startsWith('#')) return;
  const target = document.querySelector(href);
  if (!target) return;
  ev.preventDefault();
  const top = target.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0) - 10;
  window.scrollTo({ top, behavior: 'smooth' });
}
document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', offsetScroll));

// Add glow effect to CTA buttons
document.querySelectorAll('.cta').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.boxShadow = '0 0 20px rgba(96,165,250,0.4)';
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.boxShadow = '';
  });
});


