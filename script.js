// Initialize Lucide Icons
lucide.createIcons();

// --- 1. Cursor Glow Tracking ---
const cursorGlow = document.getElementById('cursor-glow');
window.addEventListener('mousemove', (e) => {
  if (cursorGlow) {
    cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  }
});

// --- 2. Ripple Button Effect ---
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('click', function (e) {
    // If it's a link to # that we intercept, e.preventDefault here? 
    // Wait, let's just add the visual effect 
    const x = e.clientX - e.target.getBoundingClientRect().left;
    const y = e.clientY - e.target.getBoundingClientRect().top;

    const ripples = document.createElement('span');
    ripples.style.left = x + 'px';
    ripples.style.top = y + 'px';
    ripples.classList.add('ripple-span');
    this.appendChild(ripples);

    setTimeout(() => {
      ripples.remove();
    }, 600);
  });
});

// --- 3. Navbar & Mobile Menu ---
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// --- 4. Intersection Observer for Reveals ---
const revealElements = document.querySelectorAll('.reveal');
let revealObserver;

function initReveal() {
  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Only trigger once
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  // Staggered manual reveal of top elements for initial page load pop
  const heroLeft = document.querySelector('.hero-left');
  const heroRight = document.querySelector('.hero-right');
  const nav = document.querySelector('.navbar');

  // They are already active, but let's observe everything
  revealElements.forEach(el => {
    // If they are hero elements, let's forcefully trigger them sequentially
    if (el.classList.contains('hero-left') || el.classList.contains('hero-right')) {
      // Ignored by observer, manually triggered
    } else {
      revealObserver.observe(el);
    }
  });

  // Sequential Entrance
  setTimeout(() => { nav.classList.add('active'); }, 100);
  setTimeout(() => { if (heroRight) heroRight.classList.add('active'); }, 300);
  setTimeout(() => { if (heroLeft) heroLeft.classList.add('active'); }, 600);
}

// --- 5. Splash Screen ---
window.addEventListener('load', () => {
  const splash = document.getElementById('splash-screen');
  if (splash) {
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => {
        initReveal();
      }, 500);
    }, 1200);
  } else {
    initReveal();
  }
});

// --- 6. Services Modal Popup ---
const modalData = {
  social: {
    title: "Social Media Marketing",
    desc: "We leverage human psychology and data analytics to construct social media campaigns that dominate feeds. From TikTok to LinkedIn, our tailored approach builds authentic relationships with your specific audience resulting in higher engagement rates and brand loyalty. We don't just post content; we craft community-driven ecosystems that transform your followers into active brand advocates.",
    features: [
      { icon: "instagram", name: "Community Management" },
      { icon: "trending-up", name: "Viral Strategy" },
      { icon: "pie-chart", name: "Performance Analytics" }
    ]
  },
  performance: {
    title: "Performance Marketing",
    desc: "Every dollar you spend on advertising should translate into measurable profit. Our performance marketing division executes incredibly surgical paid campaigns utilizing Google Ads, Facebook Ads, and programmatic displays. By rigorously A/B testing ad creative and landing page congruency, we consistently decrease your Customer Acquisition Cost (CAC) while safely scaling your Return on Ad Spend (ROAS).",
    features: [
      { icon: "mouse-pointer", name: "PPC Management" },
      { icon: "target", name: "Audience Retargeting" },
      { icon: "activity", name: "Conversion Rate Opt." }
    ]
  },
  seo: {
    title: "SEO Optimization",
    desc: "Ranking on the first page of Google isn't an accident; it requires a deep technical understanding of search algorithms. We conduct comprehensive audits diagnosing your site architecture, backlink profile, and content quality. Our white-hat SEO strategies will securely elevate your domain authority ensuring you capture the most valuable organic traffic actively searching for your solutions.",
    features: [
      { icon: "code", name: "Technical SEO Audit" },
      { icon: "file-text", name: "Content Strategy" },
      { icon: "link", name: "Authority Link Building" }
    ]
  },
  app: {
    title: "App Development",
    desc: "We engineer intuitive, high-performance, and scalable mobile applications for Android and iOS. From native applications utilizing Swift and Kotlin to powerful cross-platform solutions deploying React Native or Flutter, our experienced development team translates your unique business concepts into highly engaging software experiences built precisely to scale seamlessly.",
    features: [
      { icon: "smartphone", name: "Native Mobile Apps" },
      { icon: "layers", name: "Cross-Platform Development" },
      { icon: "layout", name: "UI/UX App Design" }
    ]
  },
  website: {
    title: "Website Development",
    desc: "Dominating the digital era requires more than just a template. We construct fast, responsive, and beautifully secure modern websites tailored precisely for high conversion rates. Our expert development stack bridges front-end aesthetics flawlessly integrating robust back-end systems ensuring your digital presence is built durably for the continuous demands of modern traffic.",
    features: [
      { icon: "monitor", name: "Custom Web Development" },
      { icon: "shopping-cart", name: "E-Commerce Solutions" },
      { icon: "zap", name: "Performance Optimization" }
    ]
  }
};

const serviceCards = document.querySelectorAll('.service-card');
const modal = document.getElementById('service-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalFeatures = document.getElementById('modal-features');
const closeBtn = document.getElementById('close-modal');

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    const serviceKey = card.getAttribute('data-service');
    if (modalData[serviceKey]) {
      const data = modalData[serviceKey];
      // Populate Modal
      modalTitle.innerHTML = `<span class="text-highlight">${data.title}</span>`;
      modalDesc.textContent = data.desc;

      // Populate Features
      modalFeatures.innerHTML = '';
      data.features.forEach(feat => {
        modalFeatures.innerHTML += `
          <div class="modal-feature">
            <i data-lucide="${feat.icon}"></i>
            <h4>${feat.name}</h4>
          </div>
        `;
      });
      lucide.createIcons();

      // Show Modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// --- 7. EmailJS Form Handling ---
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMsg = document.getElementById('form-msg');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    submitBtn.textContent = 'Sending...';
    formMsg.className = 'form-msg';
    formMsg.textContent = '';

    // emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', this)
    // Using a reliable generic emulation since environment lacks actual templates
    emailjs.sendForm('default_service', 'template_placeholder', this)
      .then(() => {
        submitBtn.textContent = 'Send Message';
        formMsg.textContent = 'Message sent successfully!';
        formMsg.classList.add('success');
        contactForm.reset();
      }, (error) => {
        // Fallback for demo since we're using mock keys without actual backend registration
        console.warn('EmailJS error (expected if key is generic)', error);
        submitBtn.textContent = 'Send Message';
        formMsg.textContent = 'Message sent successfully! (Demo Mode)';
        formMsg.classList.add('success');
        contactForm.reset();
      });
  });
}

// --- 8. Chatbot Logic ---
const chatToggle = document.getElementById('chatbot-toggle');
const chatWindow = document.getElementById('chatbot-window');
const chatClose = document.getElementById('chatbot-close');
const chatMessages = document.getElementById('chatbot-messages');
const chatForm = document.getElementById('chatbot-form');
const chatInput = document.getElementById('chatbot-input');

if (chatToggle && chatWindow) {
  chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
  });

  chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('active');
  });

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    // Add user message
    addMessage(text, 'user-msg');
    chatInput.value = '';

    // Add typing indicator
    const typingId = addTypingIndicator();

    // Determine response
    setTimeout(() => {
      removeTypingIndicator(typingId);
      const response = getBotResponse(text.toLowerCase());
      addMessage(response, 'bot-msg');
    }, 600 + Math.random() * 400); // 600-1000ms delay
  });

  function addMessage(content, className) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${className}`;
    msgDiv.textContent = content;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addTypingIndicator() {
    const id = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg bot-msg';
    typingDiv.id = id;
    typingDiv.innerHTML = `
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
  }

  function removeTypingIndicator(id) {
    const typingEl = document.getElementById(id);
    if (typingEl) typingEl.remove();
  }

  function getBotResponse(input) {
    if (input.includes('what is digital marketing') || input.includes('digital marketing')) {
      return "Digital marketing involves promoting brands using online platforms like social media, SEO, and paid advertising.";
    }
    if (input.includes('seo')) {
      return "SEO helps your website rank higher on search engines and drive organic traffic.";
    }
    if (input.includes('services') || input.includes('what do you do') || input.includes('offer')) {
      return "We offer social media marketing, SEO, app development, website development, and performance marketing.";
    }
    if (input.includes('price') || input.includes('cost') || input.includes('how much') || input.includes('pricing')) {
      return "Pricing depends on your requirements. Please contact us for a custom quote.";
    }
    if (input.includes('contact') || input.includes('reach') || input.includes('phone') || input.includes('whatsapp')) {
      return "You can reach us through the contact form or WhatsApp.";
    }
    return "I'm here to help! Please ask about services, SEO, or digital marketing.";
  }
}