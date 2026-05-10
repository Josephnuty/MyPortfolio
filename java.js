// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Fade-in animation when scrolling
const fadeElements = document.querySelectorAll('.fade-in');

const showOnScroll = () => {
  fadeElements.forEach((element) => {
    const top = element.getBoundingClientRect().top;
    const bottom = element.getBoundingClientRect().bottom;

    if (top < window.innerHeight - 100 && bottom > 0) {
      element.classList.add('show');
    }
  });
};

window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll);

// Smooth scroll behavior enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll effect to navbar
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.2)';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
  
  lastScrollTop = scrollTop;
});

// Initialize on page load
window.addEventListener('load', () => {
  showOnScroll();
});