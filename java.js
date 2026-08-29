/**
 * Joseph Ian Oray - Developer Portfolio JavaScript
 * Interactive functionality, theme handling, terminal emulator,
 * project modals, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // 1. THEME TOGGLE (Dark / Light Mode)
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  const getPreferredTheme = () => {
    const saved = localStorage.getItem('portfolioTheme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const applyTheme = (theme) => {
    if (theme === 'light') {
      body.classList.add('light-mode');
      if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('portfolioTheme', 'light');
    } else {
      body.classList.remove('light-mode');
      if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('portfolioTheme', 'dark');
    }
  };

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = body.classList.contains('light-mode');
      applyTheme(isLight ? 'dark' : 'light');
      showToast(`Switched to ${isLight ? 'Dark' : 'Light'} Mode`);
    });
  }

  // ==========================================
  // 2. SCROLL PROGRESS BAR & NAVBAR SCROLL
  // ==========================================
  const progressBar = document.getElementById('scrollProgressBar');
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('backToTop');

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Progress Bar
    if (progressBar && scrollHeight > 0) {
      const progress = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Navbar Shadow
    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to Top Button
    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 3. MOBILE NAVIGATION MENU
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    const isActive = navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
  };

  const closeMenu = () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // ==========================================
  // 4. HERO TYPEWRITER EFFECT
  // ==========================================
  const typewriterElement = document.getElementById('typewriterText');
  if (typewriterElement) {
    const roles = [
      'Front-End Developer',
      'BSIT Student',
      'Software Enthusiast',
      'Creative Problem Solver'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next word
      }

      setTimeout(type, typingSpeed);
    };

    type();
  }

  // ==========================================
  // 5. HERO MULTI-LANGUAGE GREETING ROTATION
  // ==========================================
  const heroGreeting = document.getElementById('heroGreeting');
  if (heroGreeting) {
    const greetings = [
      { text: 'こんにちは', lang: 'Japanese' },
      { text: 'Hello', lang: 'English' },
      { text: 'Kumusta', lang: 'Filipino' },
      { text: 'Bonjour', lang: 'French' },
      { text: 'Hola', lang: 'Spanish' },
      { text: '안녕하세요', lang: 'Korean' },
      { text: 'Ciao', lang: 'Italian' }
    ];
    let greetingIndex = 0;

    setInterval(() => {
      heroGreeting.style.opacity = '0';
      setTimeout(() => {
        greetingIndex = (greetingIndex + 1) % greetings.length;
        heroGreeting.textContent = greetings[greetingIndex].text;
        heroGreeting.setAttribute('title', greetings[greetingIndex].lang);
        heroGreeting.style.opacity = '1';
      }, 300);
    }, 3500);
  }

  // ==========================================
  // 6. SCROLL REVEALS & ACTIVE NAVBAR HIGHLIGHT
  // ==========================================
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => revealObserver.observe(el));

    // Active Section Tracking
    const sections = document.querySelectorAll('header[id], section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      root: null,
      threshold: 0.35
    });

    sections.forEach(sec => sectionObserver.observe(sec));
  } else {
    // Fallback for older browsers
    fadeElements.forEach(el => el.classList.add('show'));
  }

  // ==========================================
  // 7. PROJECT FILTERING SYSTEM
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================
  // 8. PROJECT DETAILS MODAL
  // ==========================================
  const projectData = {
    hotel: {
      title: 'Hotel Reservation System',
      category: 'Software & Systems',
      image: 'images/hotelr.png',
      description: 'A comprehensive desktop hotel reservation and client booking management system designed in Java with MySQL relational database integration.',
      features: [
        'Interactive Java Swing desktop user interface with real-time room availability checker.',
        'Relational MySQL database schema managing room tiers, guest histories, and booking dates.',
        'Automated billing summary and printable receipt generation for guests.',
        'Admin dashboard for checking in, checking out, and editing reservation records.'
      ],
      techTags: ['Java', 'MySQL', 'Swing GUI', 'JDBC', 'OOP Concepts'],
      links: [
        { label: 'View on GitHub', url: 'https://github.com/Josephnuty', icon: 'fab fa-github', primary: true }
      ]
    },
    poster: {
      title: 'Advertisement Poster',
      category: 'Graphic Design',
      image: 'images/adds.png',
      description: 'A high-impact promotional advertising banner designed for local business marketing, visual branding, and audience conversion.',
      features: [
        'Custom visual hierarchy designed to guide viewer eye-flow to key promotional offers.',
        'High-resolution typography and professional color grading tailored to the brand.',
        'Multi-format export optimized for both physical print displays and digital social media promotions.',
        'Layered Photoshop composition with non-destructive image adjustments and masks.'
      ],
      techTags: ['Adobe Photoshop', 'Graphic Design', 'Typography', 'Visual Branding'],
      links: [
        { label: 'Contact For Designs', url: '#contact', icon: 'fas fa-envelope', primary: true }
      ]
    },
    order: {
      title: 'Basic Order System',
      category: 'Software & Systems',
      image: 'images/personal-proj.png',
      description: 'A command-line Point-of-Sale (POS) order processing application built in C++ emphasizing robust algorithmic logic and structured control flows.',
      features: [
        'Interactive terminal menu system allowing users to select and customize item orders.',
        'Dynamic computation of item pricing, promotional discounts, and sales tax.',
        'Formatted receipt generation displaying itemized totals and order timestamps.',
        'Input sanitization to prevent crashes on invalid user entries.'
      ],
      techTags: ['C++', 'CLI Application', 'Data Logic', 'Algorithms'],
      links: [
        { label: 'View on GitHub', url: 'https://github.com/Josephnuty', icon: 'fab fa-github', primary: true }
      ]
    }
  };

  const modalBackdrop = document.getElementById('projectModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalImage = document.getElementById('modalImage');
  const modalDescription = document.getElementById('modalDescription');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalTechTags = document.getElementById('modalTechTags');
  const modalFooter = document.getElementById('modalFooter');

  const openProjectModal = (projectId) => {
    const data = projectData[projectId];
    if (!data || !modalBackdrop) return;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalImage.src = data.image;
    modalImage.alt = `${data.title} preview`;
    modalDescription.textContent = data.description;

    // Features
    modalFeatures.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fas fa-check-circle"></i> <span>${feat}</span>`;
      modalFeatures.appendChild(li);
    });

    // Tech Tags
    modalTechTags.innerHTML = '';
    data.techTags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.innerHTML = `<i class="fas fa-code"></i> ${tag}`;
      modalTechTags.appendChild(span);
    });

    // Footer Buttons
    modalFooter.innerHTML = '';
    data.links.forEach(link => {
      const a = document.createElement('a');
      a.className = `btn ${link.primary ? 'btn-primary' : 'btn-secondary'}`;
      a.href = link.url;
      if (link.url.startsWith('http')) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      } else {
        a.addEventListener('click', closeProjectModal);
      }
      a.innerHTML = `<i class="${link.icon}"></i> <span>${link.label}</span>`;
      modalFooter.appendChild(a);
    });

    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.view-details-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // ==========================================
  // 9. INTERACTIVE DEVELOPER TERMINAL SANDBOX
  // ==========================================
  const terminalInput = document.getElementById('terminalInput');
  const terminalSubmit = document.getElementById('terminalSubmit');
  const terminalOutput = document.getElementById('terminalOutput');
  const clearTerminalBtn = document.getElementById('clearTerminalBtn');
  const cmdPills = document.querySelectorAll('.cmd-pill');

  const printTerminalLine = (text, type = '') => {
    if (!terminalOutput) return;
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.innerHTML = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  };

  const executeCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    printTerminalLine(`<span class="t-accent">joseph@space:~$</span> ${rawCmd}`);

    switch (cmd) {
      case 'help':
        printTerminalLine('Available commands:');
        printTerminalLine('  <span class="t-command">about</span>    - Learn more about Joseph');
        printTerminalLine('  <span class="t-command">skills</span>   - List core technical proficiencies');
        printTerminalLine('  <span class="t-command">projects</span> - View showcased projects');
        printTerminalLine('  <span class="t-command">contact</span>  - Get contact details & links');
        printTerminalLine('  <span class="t-command">quote</span>    - Print developer philosophy');
        printTerminalLine('  <span class="t-command">theme</span>    - Toggle dark/light mode');
        printTerminalLine('  <span class="t-command">clear</span>    - Clear terminal output');
        printTerminalLine('  <span class="t-command">sudo</span>     - Admin privilege check');
        break;

      case 'about':
        printTerminalLine('Joseph Ian Oray: 2nd-Year BS Information Technology student in the Philippines.');
        printTerminalLine('Passionate about front-end web design, Java desktop systems, and clean UI engineering.');
        break;

      case 'skills':
        printTerminalLine('<span class="t-success">Frontend:</span> HTML5, CSS3/Sass, JavaScript (ES6+), Responsive UI');
        printTerminalLine('<span class="t-success">Programming:</span> Java (Swing), C++, MySQL, OOP Architecture');
        printTerminalLine('<span class="t-success">Tools:</span> Git, GitHub, VS Code, Adobe Photoshop');
        break;

      case 'projects':
        printTerminalLine('1. <span class="t-accent">Hotel Reservation System</span> (Java, MySQL, Swing)');
        printTerminalLine('2. <span class="t-accent">Advertisement Poster</span> (Adobe Photoshop Design)');
        printTerminalLine('3. <span class="t-accent">Basic Order System</span> (C++ Console POS)');
        break;

      case 'contact':
        printTerminalLine('Email: <span class="t-accent">jangadjoseph@gmail.com</span>');
        printTerminalLine('GitHub: <a href="https://github.com/Josephnuty" target="_blank" style="color:var(--accent-cyan);">github.com/Josephnuty</a>');
        printTerminalLine('Facebook: <a href="https://www.facebook.com/raii356" target="_blank" style="color:var(--accent-cyan);">facebook.com/raii356</a>');
        break;

      case 'quote':
        printTerminalLine('<span class="t-command">“Every time is a perfect time to learn, build, and innovate.”</span> - Joseph Ian Oray');
        break;

      case 'theme':
        if (themeToggle) themeToggle.click();
        printTerminalLine('Theme toggled successfully!');
        break;

      case 'clear':
        if (terminalOutput) {
          terminalOutput.innerHTML = `
            <div class="terminal-line"><span class="t-accent">Console cleared.</span> Type <span class="t-command">help</span> for commands.</div>
          `;
        }
        break;

      case 'sudo':
        printTerminalLine('<span class="t-error">Permission denied: You are a guest in this universe! 😎</span>');
        break;

      case 'date':
        printTerminalLine(new Date().toString());
        break;

      case 'whoami':
        printTerminalLine('guest@portfolio-visitor (Welcome to my site!)');
        break;

      default:
        printTerminalLine(`<span class="t-error">Command not found: '${cmd}'. Type <span class="t-command">help</span> for a list of commands.</span>`);
    }

    if (terminalInput) terminalInput.value = '';
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(terminalInput.value);
      }
    });
  }

  if (terminalSubmit) {
    terminalSubmit.addEventListener('click', () => {
      if (terminalInput) executeCommand(terminalInput.value);
    });
  }

  if (clearTerminalBtn) {
    clearTerminalBtn.addEventListener('click', () => {
      executeCommand('clear');
    });
  }

  cmdPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });

  // ==========================================
  // 10. COPY EMAIL & TOAST NOTIFICATION
  // ==========================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyEmailText = document.getElementById('copyEmailText');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  let toastTimeout;
  window.showToast = (msg) => {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = msg;
    toastNotification.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3000);
  };

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'jangadjoseph@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        if (copyEmailText) copyEmailText.textContent = 'Copied!';
        showToast('✓ Email copied to clipboard!');
        setTimeout(() => {
          if (copyEmailText) copyEmailText.textContent = 'Copy to Clipboard';
        }, 2500);
      } catch (err) {
        showToast('Email: jangadjoseph@gmail.com');
      }
    });
  }

  // ==========================================
  // 11. CONTACT FORM VALIDATION & SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const messageInput = document.getElementById('userMessage');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const submitBtn = document.getElementById('submitBtn');

    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasError = false;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        nameError.classList.add('active');
        hasError = true;
      } else {
        nameError.classList.remove('active');
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email address.';
        emailError.classList.add('active');
        hasError = true;
      } else if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.classList.add('active');
        hasError = true;
      } else {
        emailError.classList.remove('active');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please enter your message.';
        messageError.classList.add('active');
        hasError = true;
      } else {
        messageError.classList.remove('active');
      }

      if (hasError) return;

      // Simulate Sending
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.querySelector('.btn-text').textContent = 'Send Message';
        }
        showToast('✓ Thank you! Your message has been sent.');
        contactForm.reset();
      }, 1200);
    });
  }

});

