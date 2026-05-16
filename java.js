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

// Active link highlighting based on scroll position
const sections = document.querySelectorAll('section, header');

const highlightActiveLink = () => {
  let currentSection = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === currentSection) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', highlightActiveLink);
window.addEventListener('load', highlightActiveLink);

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
  highlightActiveLink();
});

// Contact form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Show success message 
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    
    // Reset form
    contactForm.reset();
    
    // Restore button after 3 seconds
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
    }, 3000);
    
    console.log('Form submitted:', { name, email, message });
  });
}

// Rotate hero greeting through different languages
const heroGreeting = document.querySelector('.hero-greeting');
if (heroGreeting) {
  const greetings = [
    { text: 'こんにちは', lang: 'Japanese' },
    { text: 'Hello', lang: 'English' },
    { text: 'Hola', lang: 'Spanish' },
    { text: 'Bonjour', lang: 'French' },
    { text: '안녕하세요', lang: 'Korean' },
    { text: 'مرحبا', lang: 'Arabic' },
    { text: 'Ciao', lang: 'Italian' },
    { text: 'Hej', lang: 'Swedish' }
  ];

  let greetingIndex = 0;

  const changeGreeting = () => {
    const nextGreeting = greetings[greetingIndex];
    heroGreeting.textContent = nextGreeting.text;
    heroGreeting.setAttribute('title', nextGreeting.lang);
    greetingIndex = (greetingIndex + 1) % greetings.length;
  };

  setInterval(changeGreeting, 4000);
}