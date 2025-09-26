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

// Mobile nav toggle with enhanced touch support
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');
if (navToggle && navList) {
  // Click/touch handler
  navToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    
    // Add visual feedback
    navToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
      navToggle.style.transform = 'scale(1)';
    }, 150);
  });
  
  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Close nav when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList.classList.contains('open')) {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Close nav when clicking on nav links
  navList.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
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

// Touch-friendly interactions for mobile devices
function addTouchInteractions() {
  // Enhanced CTA button interactions
  document.querySelectorAll('.cta').forEach(btn => {
    // Mouse events for desktop
    btn.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        btn.style.boxShadow = '0 0 20px rgba(96,165,250,0.4)';
      }
    });
    
    btn.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        btn.style.boxShadow = '';
      }
    });
    
    // Touch events for mobile
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      btn.style.transform = 'scale(0.95)';
      btn.style.boxShadow = '0 0 15px rgba(96,165,250,0.3)';
    });
    
    btn.addEventListener('touchend', () => {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '';
    });
  });
  
  // Enhanced card interactions
  document.querySelectorAll('.skill-card, .info-card, .contact-card, .edu-card, .ach-list li').forEach(card => {
    // Mouse events for desktop
    card.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 16px 32px rgba(2,6,23,0.6)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '';
      }
    });
    
    // Touch events for mobile
    card.addEventListener('touchstart', (e) => {
      e.preventDefault();
      card.style.transform = 'translateY(-2px)';
      card.style.boxShadow = '0 8px 16px rgba(2,6,23,0.4)';
    });
    
    card.addEventListener('touchend', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '';
    });
  });
}

// Initialize touch interactions
addTouchInteractions();

// Re-initialize on resize to handle orientation changes
window.addEventListener('resize', () => {
  addTouchInteractions();
});

// Smooth scrolling for mobile with proper offset
function smoothScrollTo(targetId) {
  const target = document.querySelector(targetId);
  if (!target) return;
  
  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.offsetHeight : 0;
  const offset = headerHeight + 20;
  
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// Enhanced anchor link handling
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    smoothScrollTo(targetId);
  });
});

// Performance optimization for mobile
function optimizeForMobile() {
  // Reduce particle frequency on mobile
  if (window.innerWidth < 768) {
    clearInterval(window.particleInterval);
    window.particleInterval = setInterval(createParticle, 4000);
  } else {
    clearInterval(window.particleInterval);
    window.particleInterval = setInterval(createParticle, 2000);
  }
  
  // Disable hover effects on touch devices
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
  }
}

// Initialize mobile optimizations
optimizeForMobile();
window.addEventListener('resize', optimizeForMobile);

// 3D Solar System Skills Circle with Elliptical Orbits
function initSkillsCircle() {
  const skillItems = document.querySelectorAll('.skill-item');
  const tooltip = document.getElementById('skill-tooltip');
  const tooltipText = tooltip.querySelector('.tooltip-text');
  const container = document.querySelector('.skills-circle-container');
  const svg = container.querySelector('.skills-circle');
  
  let isHovering = false;
  let isReversed = false;
  let mousePosition = { x: 0, y: 0 };
  let animationTime = 0;
  
  // Calculate 3D elliptical orbital position
  function calculate3DOrbitalPosition(orbit, angle, time, centerX = 100, centerY = 100) {
    const baseRadius = orbit === 1 ? 35 : orbit === 2 ? 50 : 65;
    const depth = orbit === 1 ? 10 : orbit === 2 ? 15 : 20;
    
    // Create elliptical motion with depth variation
    const radians = (angle * Math.PI) / 180;
    const depthVariation = Math.sin(time * 0.01) * depth;
    const radius = baseRadius + (depthVariation * 0.1);
    
    // Calculate 3D position
    const x = centerX + radius * Math.cos(radians);
    const y = centerY + radius * Math.sin(radians);
    const z = depthVariation;
    
    return { x, y, z, opacity: Math.max(0.5, 1 - Math.abs(z) / (depth * 2)) };
  }
  
  // Calculate magnetic attraction toward cursor with 3D effect
  function calculate3DMagneticPosition(planet, mouseX, mouseY, centerX = 100, centerY = 100) {
    const orbit = parseInt(planet.getAttribute('data-orbit'));
    const baseAngle = parseInt(planet.getAttribute('data-angle'));
    const basePos = calculate3DOrbitalPosition(orbit, baseAngle, animationTime, centerX, centerY);
    
    // Calculate direction from planet to mouse
    const dx = mouseX - basePos.x;
    const dy = mouseY - basePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Magnetic strength based on distance (closer = stronger)
    const maxDistance = 150;
    const magneticStrength = Math.max(0, 1 - (distance / maxDistance)) * 0.4;
    
    // Move planet toward mouse with 3D effect
    const moveX = dx * magneticStrength;
    const moveY = dy * magneticStrength;
    const moveZ = Math.sin(distance * 0.01) * 10; // Add some 3D wobble
    
    return {
      x: basePos.x + moveX,
      y: basePos.y + moveY,
      z: basePos.z + moveZ,
      opacity: Math.max(0.3, basePos.opacity - Math.abs(moveZ) * 0.01)
    };
  }
  
  // Update planet positions with 3D effects
  function updatePlanetPositions() {
    if (!isHovering) return;
    
    skillItems.forEach(planet => {
      const magneticPos = calculate3DMagneticPosition(planet, mousePosition.x, mousePosition.y);
      const circle = planet.querySelector('circle');
      const foreignObject = planet.querySelector('foreignObject');
      
      if (circle && foreignObject) {
        // Update circle position
        circle.setAttribute('cx', magneticPos.x);
        circle.setAttribute('cy', magneticPos.y);
        circle.setAttribute('opacity', magneticPos.opacity);
        
        // Update icon position
        const iconSize = parseInt(foreignObject.getAttribute('width'));
        foreignObject.setAttribute('x', magneticPos.x - iconSize / 2);
        foreignObject.setAttribute('y', magneticPos.y - iconSize / 2);
        
        // Apply 3D transform
        const scale = Math.max(0.8, 1 - Math.abs(magneticPos.z) * 0.01);
        planet.style.transform = `translateZ(${magneticPos.z}px) scale(${scale})`;
      }
    });
  }
  
  // Mouse move handler for magnetic effect
  function handleMouseMove(e) {
    const rect = container.getBoundingClientRect();
    const scaleX = 200 / rect.width;
    const scaleY = 200 / rect.height;
    
    mousePosition.x = (e.clientX - rect.left) * scaleX;
    mousePosition.y = (e.clientY - rect.top) * scaleY;
    
    updatePlanetPositions();
  }
  
  // Performance optimization for mobile devices
  let isMobile = window.innerWidth <= 768;
  let animationFrameId;
  let lastTime = 0;
  const targetFPS = isMobile ? 30 : 60;
  const frameInterval = 1000 / targetFPS;
  
  // Animation loop for 3D effects with performance optimization
  function animate3D(currentTime) {
    if (currentTime - lastTime >= frameInterval) {
      animationTime += frameInterval;
      lastTime = currentTime;
    }
    
    animationFrameId = requestAnimationFrame(animate3D);
  }
  
  // Start animation loop
  animationFrameId = requestAnimationFrame(animate3D);
  
  // Handle window resize for performance optimization
  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
    const newTargetFPS = isMobile ? 30 : 60;
    const newFrameInterval = 1000 / newTargetFPS;
    
    // Cancel current animation
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    
    // Restart with new settings
    lastTime = 0;
    animationFrameId = requestAnimationFrame(animate3D);
  });
  
  // Container hover handlers with mobile optimization
  container.addEventListener('mouseenter', () => {
    isHovering = true;
    isReversed = !isReversed;
    
    // Only add mousemove listener on non-touch devices
    if (!isMobile) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    // Add enhanced glow effect
    svg.style.filter = 'drop-shadow(0 20px 50px rgba(96,165,250,0.6))';
    
    // Add 3D perspective to the entire system (reduced on mobile)
    const perspectiveValue = isMobile ? 'perspective(600px) rotateX(2deg) rotateY(2deg)' : 'perspective(1000px) rotateX(5deg) rotateY(5deg)';
    svg.style.transform = perspectiveValue;
    svg.style.transition = 'transform 0.5s ease';
    
    // Speed up and reverse orbital animations (less aggressive on mobile)
    const speedMultiplier = isMobile ? 0.8 : 0.7;
    skillItems.forEach(item => {
      const orbit = item.getAttribute('data-orbit');
      const duration = orbit === '1' ? '15s' : orbit === '2' ? '25s' : '35s';
      item.style.animationDuration = duration.replace('s', '') * speedMultiplier + 's';
      item.style.animationDirection = isReversed ? 'reverse' : 'normal';
    });
  });
  
  container.addEventListener('mouseleave', () => {
    isHovering = false;
    container.removeEventListener('mousemove', handleMouseMove);
    
    // Reset planet positions to orbital
    skillItems.forEach(planet => {
      const orbit = parseInt(planet.getAttribute('data-orbit'));
      const angle = parseInt(planet.getAttribute('data-angle'));
      const pos = calculate3DOrbitalPosition(orbit, angle, animationTime);
      
      const circle = planet.querySelector('circle');
      const foreignObject = planet.querySelector('foreignObject');
      
      if (circle && foreignObject) {
        circle.setAttribute('cx', pos.x);
        circle.setAttribute('cy', pos.y);
        circle.setAttribute('opacity', pos.opacity);
        
        const iconSize = parseInt(foreignObject.getAttribute('width'));
        foreignObject.setAttribute('x', pos.x - iconSize / 2);
        foreignObject.setAttribute('y', pos.y - iconSize / 2);
        
        planet.style.transform = `translateZ(${pos.z}px) scale(${Math.max(0.8, 1 - Math.abs(pos.z) * 0.01)})`;
      }
    });
    
    // Reset visual effects
    svg.style.filter = 'drop-shadow(0 10px 30px rgba(2,6,23,0.6))';
    svg.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    
    // Reset animation speeds and direction
    skillItems.forEach(item => {
      const orbit = item.getAttribute('data-orbit');
      item.style.animationDuration = orbit === '1' ? '15s' : orbit === '2' ? '25s' : '35s';
      item.style.animationDirection = 'normal';
    });
  });
  
  // Individual planet hover effects
  skillItems.forEach(item => {
    const skillName = item.getAttribute('data-skill');
    
    item.addEventListener('mouseenter', (e) => {
      tooltipText.textContent = skillName;
      tooltip.classList.add('show');
      
      const rect = item.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top - 50;
      
      const finalX = Math.max(10, Math.min(x, containerRect.width - 10));
      const finalY = Math.max(10, y);
      
      tooltip.style.left = `${finalX}px`;
      tooltip.style.top = `${finalY}px`;
      tooltip.style.transform = 'translateX(-50%) translateY(0)';
      
      // Enhanced visual effects
      item.style.filter = 'drop-shadow(0 12px 30px rgba(96,165,250,0.8))';
      createEnhancedRippleEffect(item, skillName);
      addSkillGlow(item, skillName);
    });
    
    item.addEventListener('mouseleave', () => {
      tooltip.classList.remove('show');
      item.style.filter = '';
      removeSkillGlow(item);
    });
    
    // Touch events for mobile
    item.addEventListener('touchstart', (e) => {
      e.preventDefault();
      tooltipText.textContent = skillName;
      tooltip.classList.add('show');
      
      const rect = item.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top - 50;
      
      const finalX = Math.max(10, Math.min(x, containerRect.width - 10));
      const finalY = Math.max(10, y);
      
      tooltip.style.left = `${finalX}px`;
      tooltip.style.top = `${finalY}px`;
      tooltip.style.transform = 'translateX(-50%) translateY(0)';
      
      item.style.filter = 'drop-shadow(0 12px 30px rgba(96,165,250,0.8))';
      addSkillGlow(item, skillName);
    });
    
    item.addEventListener('touchend', () => {
      setTimeout(() => {
        tooltip.classList.remove('show');
        item.style.filter = '';
        removeSkillGlow(item);
      }, 3000);
    });
  });
}

// Create enhanced ripple effect for skill items
function createEnhancedRippleEffect(element, skillName) {
  const ripple = document.createElement('div');
  const skillColors = {
    'React': 'rgba(97, 218, 251, 0.4)',
    'Node.js': 'rgba(104, 160, 99, 0.4)',
    'Python': 'rgba(55, 118, 171, 0.4)',
    'JavaScript': 'rgba(247, 223, 30, 0.4)',
    'TypeScript': 'rgba(49, 120, 198, 0.4)',
    'MongoDB': 'rgba(76, 175, 80, 0.4)',
    'MySQL': 'rgba(0, 96, 128, 0.4)',
    'Docker': 'rgba(13, 147, 213, 0.4)',
    'Git': 'rgba(240, 80, 52, 0.4)',
    'AWS': 'rgba(255, 153, 0, 0.4)',
    'Express': 'rgba(104, 104, 104, 0.4)',
    'FastAPI': 'rgba(0, 146, 202, 0.4)'
  };
  
  const color = skillColors[skillName] || 'rgba(96,165,250,0.4)';
  
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, ${color} 0%, transparent 70%);
    transform: scale(0);
    animation: enhancedRipple 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    pointer-events: none;
    z-index: 1000;
  `;
  
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2.5;
  
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${rect.left + rect.width / 2 - size / 2}px`;
  ripple.style.top = `${rect.top + rect.height / 2 - size / 2}px`;
  
  document.body.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 800);
}

// Add skill-specific glow effect
function addSkillGlow(element, skillName) {
  const glow = document.createElement('div');
  const skillColors = {
    'React': 'rgba(97, 218, 251, 0.2)',
    'Node.js': 'rgba(104, 160, 99, 0.2)',
    'Python': 'rgba(55, 118, 171, 0.2)',
    'JavaScript': 'rgba(247, 223, 30, 0.2)',
    'TypeScript': 'rgba(49, 120, 198, 0.2)',
    'MongoDB': 'rgba(76, 175, 80, 0.2)',
    'MySQL': 'rgba(0, 96, 128, 0.2)',
    'Docker': 'rgba(13, 147, 213, 0.2)',
    'Git': 'rgba(240, 80, 52, 0.2)',
    'AWS': 'rgba(255, 153, 0, 0.2)',
    'Express': 'rgba(104, 104, 104, 0.2)',
    'FastAPI': 'rgba(0, 146, 202, 0.2)'
  };
  
  const color = skillColors[skillName] || 'rgba(96,165,250,0.2)';
  
  glow.className = 'skill-glow';
  glow.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, ${color} 0%, transparent 60%);
    transform: scale(1);
    animation: skillGlow 2s ease-in-out infinite;
    pointer-events: none;
    z-index: 999;
  `;
  
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 3;
  
  glow.style.width = glow.style.height = `${size}px`;
  glow.style.left = `${rect.left + rect.width / 2 - size / 2}px`;
  glow.style.top = `${rect.top + rect.height / 2 - size / 2}px`;
  
  document.body.appendChild(glow);
  element.glowElement = glow;
}

// Remove skill glow effect
function removeSkillGlow(element) {
  if (element.glowElement) {
    element.glowElement.remove();
    element.glowElement = null;
  }
}

// Add enhanced animation CSS
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
  @keyframes enhancedRipple {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.8;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }
  
  @keyframes skillGlow {
    0%, 100% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.6;
    }
  }
  
  .skill-glow {
    animation: skillGlow 2s ease-in-out infinite;
  }
`;
document.head.appendChild(enhancedStyles);

// Initialize skills circle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initSkillsCircle();
  initProjectsSection();
});

// Add CSS for touch devices
const touchStyles = document.createElement('style');
touchStyles.textContent = `
  .touch-device .skill-card:hover,
  .touch-device .info-card:hover,
  .touch-device .contact-card:hover,
  .touch-device .edu-card:hover,
  .touch-device .ach-list li:hover {
    transform: none !important;
    box-shadow: none !important;
  }
  
  .touch-device .cta:hover {
    box-shadow: none !important;
  }
  
  /* Improve touch targets */
  @media (max-width: 768px) {
    .cta {
      min-height: 44px;
      min-width: 44px;
    }
    
    .nav-toggle {
      min-height: 44px;
      min-width: 44px;
    }
    
    .theme-toggle {
      min-height: 44px;
      min-width: 44px;
    }
    
    .nav-list a {
      min-height: 44px;
      display: flex;
      align-items: center;
    }
    
    .skill-item {
      min-height: 44px;
      min-width: 44px;
    }
  }
  
  /* Skills circle mobile optimizations */
  @media (max-width: 768px) {
    .skills-circle-container {
      width: min(320px, 85%);
    }
    
    .skill-tooltip {
      font-size: 12px;
      padding: 6px 10px;
    }
    
    .skill-item:hover {
      transform: scale(1.2) translateY(-3px);
    }
  }
`;
document.head.appendChild(touchStyles);

// Enhanced Projects Section Functionality
function initProjectsSection() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  const modalClose = document.querySelector('.modal-close');
  const likeButtons = document.querySelectorAll('.like-btn');
  const shareButtons = document.querySelectorAll('.share-btn');
  const demoButtons = document.querySelectorAll('.project-demo');

  // Project filtering functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter projects with animation
      projectCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
          card.style.display = 'flex';
          card.style.animation = `fadeInUp 0.6s ease forwards`;
          card.style.animationDelay = `${index * 0.1}s`;
        } else {
          card.style.animation = 'fadeOut 0.3s ease forwards';
          setTimeout(() => {
            if (card.style.animation.includes('fadeOut')) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });

  // Project card hover effects
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-12px) scale(1.03)';
      card.style.boxShadow = '0 25px 50px rgba(96, 165, 250, 0.2)';
      
      // Animate tech tags
      const techTags = card.querySelectorAll('.tech-tag');
      techTags.forEach((tag, index) => {
        setTimeout(() => {
          tag.style.transform = 'translateY(-2px)';
          tag.style.boxShadow = '0 6px 20px rgba(96, 165, 250, 0.3)';
        }, index * 50);
      });
      
      // Animate feature items
      const featureItems = card.querySelectorAll('.feature-item');
      featureItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = 'translateX(5px)';
          item.style.color = 'var(--accent-1)';
        }, index * 100);
      });
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      
      // Reset tech tags
      const techTags = card.querySelectorAll('.tech-tag');
      techTags.forEach(tag => {
        tag.style.transform = 'translateY(0)';
        tag.style.boxShadow = 'none';
      });
      
      // Reset feature items
      const featureItems = card.querySelectorAll('.feature-item');
      featureItems.forEach(item => {
        item.style.transform = 'translateX(0)';
        item.style.color = 'var(--text-1)';
      });
    });
  });

  // Like button functionality
  likeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const likeCount = button.querySelector('.like-count');
      let count = parseInt(likeCount.textContent);
      
      if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        count--;
        likeCount.textContent = count;
        button.style.animation = 'unlike 0.3s ease';
      } else {
        button.classList.add('liked');
        count++;
        likeCount.textContent = count;
        button.style.animation = 'like 0.3s ease';
      }
      
      setTimeout(() => {
        button.style.animation = '';
      }, 300);
    });
  });

  // Share button functionality
  shareButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const projectCard = button.closest('.project-card');
      const projectTitle = projectCard.querySelector('.project-title').textContent;
      const projectUrl = window.location.href;
      
      if (navigator.share) {
        navigator.share({
          title: projectTitle,
          text: `Check out this amazing project: ${projectTitle}`,
          url: projectUrl
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(projectUrl).then(() => {
          showNotification('Project link copied to clipboard!');
        });
      }
    });
  });

  // Demo button functionality
  demoButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const projectCard = button.closest('.project-card');
      const projectTitle = projectCard.querySelector('.project-title').textContent;
      const projectDescription = projectCard.querySelector('.project-description').textContent;
      const techTags = Array.from(projectCard.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
      
      // Show modal with project details
      showProjectModal(projectTitle, projectDescription, techTags);
    });
  });

  // Modal functionality
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      closeProjectModal();
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
      closeProjectModal();
    }
  });

  // Add CSS animations
  const projectStyles = document.createElement('style');
  projectStyles.textContent = `
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
    
    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-30px);
      }
    }
    
    @keyframes like {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    
    @keyframes unlike {
      0% { transform: scale(1); }
      50% { transform: scale(0.8); }
      100% { transform: scale(1); }
    }
    
    .project-card {
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .tech-tag {
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .feature-item {
      transition: all 0.3s ease;
    }
  `;
  document.head.appendChild(projectStyles);
}

// Show project modal
function showProjectModal(title, description, techStack) {
  const modal = document.getElementById('project-modal');
  const modalTitle = modal.querySelector('.modal-title');
  const modalProjectTitle = modal.querySelector('.modal-project-title');
  const modalDescription = modal.querySelector('.modal-description');
  const modalTech = modal.querySelector('.modal-tech');
  
  modalTitle.textContent = 'Project Details';
  modalProjectTitle.textContent = title;
  modalDescription.textContent = description;
  
  // Clear and populate tech stack
  modalTech.innerHTML = '';
  techStack.forEach(tech => {
    const techTag = document.createElement('span');
    techTag.className = 'tech-tag';
    techTag.textContent = tech;
    modalTech.appendChild(techTag);
  });
  
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// Close project modal
function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--accent-1);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
    z-index: 1001;
    animation: slideInRight 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(notificationStyles);

// Enhanced mobile touch handling
function enhanceMobileTouchHandling() {
  // Add touch event listeners for all CTA buttons
  document.querySelectorAll('.cta').forEach(button => {
    // Remove any existing touch listeners to avoid duplicates
    button.removeEventListener('touchstart', handleTouchStart);
    button.removeEventListener('touchend', handleTouchEnd);
    
    // Add new touch listeners
    button.addEventListener('touchstart', handleTouchStart, { passive: false });
    button.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Ensure the button is clickable
    button.style.cursor = 'pointer';
    button.style.userSelect = 'none';
    button.style.webkitUserSelect = 'none';
    button.style.webkitTapHighlightColor = 'transparent';
  });
  
  // Add touch event listeners for navigation
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.removeEventListener('touchstart', handleNavTouchStart);
    navToggle.addEventListener('touchstart', handleNavTouchStart, { passive: false });
    navToggle.style.cursor = 'pointer';
    navToggle.style.userSelect = 'none';
    navToggle.style.webkitUserSelect = 'none';
    navToggle.style.webkitTapHighlightColor = 'transparent';
  }
  
  // Add touch event listeners for theme toggle
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.removeEventListener('touchstart', handleThemeTouchStart);
    themeToggle.addEventListener('touchstart', handleThemeTouchStart, { passive: false });
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.userSelect = 'none';
    themeToggle.style.webkitUserSelect = 'none';
    themeToggle.style.webkitTapHighlightColor = 'transparent';
  }
  
  // Add touch event listeners for contact cards
  document.querySelectorAll('.contact-card').forEach(card => {
    card.removeEventListener('touchstart', handleCardTouchStart);
    card.addEventListener('touchstart', handleCardTouchStart, { passive: false });
    card.style.cursor = 'pointer';
    card.style.userSelect = 'none';
    card.style.webkitUserSelect = 'none';
    card.style.webkitTapHighlightColor = 'transparent';
  });
}

// Touch event handlers
function handleTouchStart(e) {
  e.preventDefault();
  const button = e.currentTarget;
  button.style.transform = 'scale(0.98)';
  button.style.transition = 'transform 0.1s ease';
  
  // Add visual feedback
  button.style.boxShadow = '0 0 15px rgba(96,165,250,0.3)';
}

function handleTouchEnd(e) {
  const button = e.currentTarget;
  button.style.transform = 'scale(1)';
  button.style.boxShadow = '';
  
  // Trigger the actual click after a short delay
  setTimeout(() => {
    button.click();
  }, 50);
}

function handleNavTouchStart(e) {
  e.preventDefault();
  const button = e.currentTarget;
  button.style.transform = 'scale(0.98)';
  button.style.transition = 'transform 0.1s ease';
  
  setTimeout(() => {
    button.style.transform = 'scale(1)';
    button.click();
  }, 50);
}

function handleThemeTouchStart(e) {
  e.preventDefault();
  const button = e.currentTarget;
  button.style.transform = 'scale(0.98)';
  button.style.transition = 'transform 0.1s ease';
  
  setTimeout(() => {
    button.style.transform = 'scale(1)';
    button.click();
  }, 50);
}

function handleCardTouchStart(e) {
  e.preventDefault();
  const card = e.currentTarget;
  card.style.transform = 'scale(0.98)';
  card.style.transition = 'transform 0.1s ease';
  
  setTimeout(() => {
    card.style.transform = 'scale(1)';
    card.click();
  }, 50);
}

// Initialize mobile touch handling when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  enhanceMobileTouchHandling();
});

// Re-initialize on window resize
window.addEventListener('resize', () => {
  enhanceMobileTouchHandling();
});


