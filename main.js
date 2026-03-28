// Sticky Navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.padding = "10px 0";
    navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.05)";
  } else {
    navbar.style.padding = "20px 0";
    navbar.style.boxShadow = "none";
  }
});

// Scroll Reveal
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Lightbox Gallery
const portfolioContainer = document.querySelector(".portfolio-sections");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("img01");
const closeLightbox = document.querySelector(".close-lightbox");

// Delegation for click
portfolioContainer.addEventListener("click", (e) => {
  const item = e.target.closest(".portfolio-item");
  if (!item) return;

  const img = item.querySelector("img");
  const title = item.dataset.title;
  const desc = item.dataset.description;

  if (!title || !desc) return; // For fillers or non-images

  lightbox.style.display = "flex";
  lightboxImg.src = img.src;
  document.body.style.overflow = "hidden";
});

closeLightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
  document.body.style.overflow = "auto";
});

// Testimonial Slider
const track = document.querySelector(".testimonial-track");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

if (track && prevBtn && nextBtn) {
  let index = 0;
  const cards = document.querySelectorAll(".testimonial-card");
  
  const updateSlider = () => {
    track.style.transform = `translateX(${-index * 100}%)`;
  };

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % cards.length;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + cards.length) % cards.length;
    updateSlider();
  });
}

// Portfolio Tabs Navigation
const tabBtns = document.querySelectorAll(".tab-btn");
const portfolioSections = document.querySelectorAll(".look-section");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const navHeight = 120; // Navbar + Tabs height
      const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      // Simple active state update
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    }
  });
});

// Update active tab on scroll
window.addEventListener("scroll", () => {
  let current = "";
  portfolioSections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  tabBtns.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.target === current) {
      btn.classList.add("active");
    }
  });
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.classList.contains("lightbox-container")) {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Mobile Menu Toggle (Basic)
const mobileBtn = document.querySelector(".mobile-menu-btn");
mobileBtn.addEventListener("click", () => {
  alert(
    "Mobile menu feature coming soon! Please use desktop for full experience.",
  );
});
