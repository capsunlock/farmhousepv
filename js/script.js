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

// if (document.getElementById("contactForm")) {
//   const contactForm = document.getElementById("contactForm");
//   const response = document.getElementById("formResponse");

//   contactForm?.addEventListener("submit", (e) => {
//     e.preventDefault();
//     contactForm.reset();
//     response.textContent = "✅ Message sent successfully! We'll get back to you soon.";
//     setTimeout(() => response.textContent = "", 5000);
//   });
// }

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const response = document.getElementById("formResponse");
  const newsletterCheckbox = document.getElementById("subscribe");

  if (!response) return;

  // Load saved newsletter preference (if exists)
  document.addEventListener("DOMContentLoaded", () => {
    const storedPreference = localStorage.getItem("newsletterOptIn");
    if (storedPreference === "true") {
      newsletterCheckbox.checked = true;
    }
  });

  // Store newsletter preference on checkbox toggle
  newsletterCheckbox?.addEventListener("change", () => {
    localStorage.setItem("newsletterOptIn", newsletterCheckbox.checked);
  });

  // Handle form submission
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const wantsNewsletter = newsletterCheckbox.checked;
    console.log("Wants Newsletter:", wantsNewsletter);

    // Reset form + show response
    contactForm.reset();
    localStorage.setItem("newsletterOptIn", "false"); // Clear opt-in if unchecked

    response.textContent = "✅ Thanks for your review!";

    setTimeout(() => {
      response.textContent = "";
      // Optionally restore checkbox state if saved
      const saved = localStorage.getItem("newsletterOptIn");
      if (saved === "true") newsletterCheckbox.checked = true;
    }, 5000);
  });
})


// Support Center
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("faqSearch");
  const clearBtn = document.getElementById("clearSearch");
  const noResults = document.getElementById("noResults");
  const faqItems = document.querySelectorAll(".faq-item");

  const highlight = (text, term) =>
    term ? text.replace(new RegExp(`(${term})`, "gi"), "<mark>$1</mark>") : text;

  function filterFAQs(term) {
    let matchCount = 0;
    faqItems.forEach((item) => {
      const toggle = item.querySelector(".faq-toggle");
      const content = item.querySelector(".faq-content");
      const question = toggle.textContent.toLowerCase();
      const answer = content.textContent.toLowerCase();
      const match = question.includes(term) || answer.includes(term);

      item.style.display = match ? "block" : "none";
      item.classList.toggle("show", match);
      if (match) matchCount++;

      toggle.innerHTML = highlight(toggle.textContent, term);
      content.innerHTML = highlight(content.textContent, term);
    });

    clearBtn.classList.toggle("visible", term.length > 0);
    noResults.style.display = matchCount === 0 ? "block" : "none";
  }

  // ✅ Apply ?q= from URL
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q") || "";
  searchInput.value = query;
  filterFAQs(query);

  // ✅ Preload first FAQ open if no search
  if (!query) {
    const firstItem = document.querySelector(".faq-item");
    if (firstItem) {
      firstItem.classList.add("open");
      const btn = firstItem.querySelector(".faq-toggle");
      const icon = btn.querySelector(".faq-icon");
      btn.setAttribute("aria-expanded", "true");
      icon.textContent = "–";
    }
  }

  // ✅ Search typing updates view + URL
  searchInput?.addEventListener("input", () => {
    const term = searchInput.value.trim();
    filterFAQs(term);

    const newURL = term
      ? `${window.location.pathname}?q=${encodeURIComponent(term)}`
      : window.location.pathname;

    history.replaceState(null, "", newURL);
  });

  // ✅ Clear button resets everything
  clearBtn?.addEventListener("click", () => {
    searchInput.value = "";
    filterFAQs("");
    history.replaceState(null, "", window.location.pathname);
  });

  // ✅ Accordion toggle behavior
  document.querySelectorAll(".faq-toggle").forEach((btn) => {
    const item = btn.parentElement;
    const icon = btn.querySelector(".faq-icon");

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item").forEach((el) => {
        el.classList.remove("open");
        el.querySelector(".faq-toggle").setAttribute("aria-expanded", "false");
        el.querySelector(".faq-icon").textContent = "+";
      });

      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        icon.textContent = "–";
      }
    });
  });
});

// Back To Top
if (document.getElementById("backToTop")) {
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
}