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
    const baseRadius = orbit === 1 ? 45 : orbit === 2 ? 65 : 85;
    const depth = orbit === 1 ? 20 : orbit === 2 ? 30 : 40;
    
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
  
  // Animation loop for 3D effects
  function animate3D() {
    animationTime += 16; // ~60fps
    requestAnimationFrame(animate3D);
  }
  
  // Start animation loop
  animate3D();
  
  // Container hover handlers
  container.addEventListener('mouseenter', () => {
    isHovering = true;
    isReversed = !isReversed;
    container.addEventListener('mousemove', handleMouseMove);
    
    // Add enhanced glow effect
    svg.style.filter = 'drop-shadow(0 20px 50px rgba(96,165,250,0.6))';
    
    // Add 3D perspective to the entire system
    svg.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg)';
    svg.style.transition = 'transform 0.5s ease';
    
    // Speed up and reverse orbital animations
    skillItems.forEach(item => {
      const orbit = item.getAttribute('data-orbit');
      const duration = orbit === '1' ? '15s' : orbit === '2' ? '25s' : '35s';
      item.style.animationDuration = duration.replace('s', '') * 0.7 + 's';
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


