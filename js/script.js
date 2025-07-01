function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme)
    
    const themeToggleButton = document.querySelector(".theme-toggle");
    themeToggleButton.textContent = newTheme === "dark" ? "🌞" : "🌙";
  }

window.addEventListener('scroll', () => {
  const cards = document.querySelectorAll('.feature-card, .product-card, .about-section');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
});

// Mobile menu toggle
function toggleMobileMenu() {
  document.body.classList.toggle("nav-open");

  // Lock or unlock scroll
  if (document.body.classList.contains("nav-open")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

// Close menu when a nav link is clicked
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      document.body.style.overflow ="";
    });
  });

  // Close menu if clicking outside nav
  document.addEventListener("click", (e) => {
    const nav = document.querySelector("nav");
    const isClickInside = nav.contains(e.target);
    const isMenuOpen = document.body.classList.contains("nav-open");

    if (!isClickInside && isMenuOpen) {
      document.body.classList.remove("nav-open");
      document.body.style.overflow ="";
    }
  });
});

// On load check for stored theme
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", savedTheme);

  const themeToggleButton = document.querySelector(".theme-toggle")
  if (themeToggleButton) {
     themeToggleButton.textContent = savedTheme === "dark" ? "🌞" : "🌙";
  }
 
  // Initialize card animation style
  const cards = document.querySelectorAll('.feature-card, .product-card, .about-section');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
});

// Form success feedback (mock behavior)
if (document.getElementById("contactForm")) {
  const contactForm = document.getElementById("contactForm");
  const response = document.getElementById("formResponse");

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    contactForm.reset();
    response.textContent = "✅ Message sent successfully! We'll get back to you soon.";
    setTimeout(() => response.textContent = "", 5000);
  });
}

// Back To Top
const backToTopBtn = document.getElementById("backToTop");

//Detect the first large section of the page
const firstSection = document.querySelector("main section");

window.addEventListener("scroll", () => {
  if (!firstSection) return;

  const firstBottom = firstSection.offsetTop + firstSection.offsetHeight;

  if (window.scrollY > firstBottom) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});