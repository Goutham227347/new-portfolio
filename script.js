/* ===== TYPING ANIMATION ===== */
const typingTexts = [
  "Software Developer",
  "Full-Stack Enthusiast",
  "ML Explorer",
  "React Developer",
  "Python Programmer"
];
let textIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById("typingText");

function typeEffect() {
  const current = typingTexts[textIndex];
  typingEl.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex > current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    speed = 400;
  }
  setTimeout(typeEffect, speed);
}
typeEffect();

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  backToTop.classList.toggle("visible", window.scrollY > 500);

  // Active link
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ===== MOBILE MENU ===== */
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinksContainer.classList.toggle("open");
});

navLinksContainer.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinksContainer.classList.remove("open");
  })
);

/* ===== THEME TOGGLE ===== */
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;
const saved = localStorage.getItem("theme");
if (saved) html.setAttribute("data-theme", saved);

themeToggle.addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* ===== REVEAL ON SCROLL ===== */
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* ===== STAT COUNTER ===== */
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.target);
    const isFloat = target % 1 !== 0;
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = isFloat ? (target * eased).toFixed(2) : Math.floor(target * eased);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = isFloat ? target.toFixed(2) : target;
    }
    requestAnimationFrame(update);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll(".stat-number").forEach(el => statObserver.observe(el));

/* ===== PROJECT FILTER ===== */
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !match);
      if (match) { card.style.animation = "fadeInUp .5s forwards"; }
    });
  });
});

/* ===== CURSOR GLOW ===== */
const glow = document.getElementById("cursorGlow");
document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* ===== CONTACT FORM ===== */
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const btn = e.target.querySelector(".btn-submit span");
  btn.textContent = "Message Sent!";
  setTimeout(() => { btn.textContent = "Send Message"; e.target.reset(); }, 2500);
});
