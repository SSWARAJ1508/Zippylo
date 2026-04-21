// Initialize Lucide Icons
lucide.createIcons();

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky Navbar Background on Scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  // Prevent scrolling when menu is open
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close Mobile Menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Active Link Highlighting based on scroll position
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
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

// Scroll Reveal Animations using Intersection Observer
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Optional: Stop observing once revealed
      // observer.unobserve(entry.target); 
    }
  });
}, {
  root: null,
  threshold: 0.15, // Trigger when 15% of the element is visible
  rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});