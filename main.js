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

// Portfolio Carousel & Lightbox
const track = document.querySelector(".carousel-track");
const items = Array.from(track.children);
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

// Clone items for infinite scroll (Double clones for smoother wrap)
items.forEach((item) => {
  const clone = item.cloneNode(true);
  track.appendChild(clone);
});

let scrollAmount = 0;
let isPaused = false;
const speed = 0.5; // Pixels per frame

function step() {
  if (!isPaused) {
    scrollAmount -= speed;
    const firstItemWidth = track.firstElementChild.offsetWidth + 30; // item width + margin
    const totalOriginalWidth = items.length * firstItemWidth;

    if (Math.abs(scrollAmount) >= totalOriginalWidth) {
      scrollAmount = 0;
    }
    track.style.transform = `translateX(${scrollAmount}px)`;
  }
  requestAnimationFrame(step);
}

// Start auto-scroll
requestAnimationFrame(step);

track.addEventListener("mouseenter", () => (isPaused = true));
track.addEventListener("mouseleave", () => (isPaused = false));

// Manual Navigation
nextBtn.addEventListener("click", () => {
  const itemWidth = track.firstElementChild.offsetWidth + 30;
  scrollAmount -= itemWidth;
  const totalOriginalWidth = items.length * itemWidth;
  if (Math.abs(scrollAmount) >= totalOriginalWidth) scrollAmount = 0;
  track.style.transform = `translateX(${scrollAmount}px)`;
});

prevBtn.addEventListener("click", () => {
  const itemWidth = track.firstElementChild.offsetWidth + 30;
  scrollAmount += itemWidth;
  if (scrollAmount > 0) {
    const totalOriginalWidth = items.length * itemWidth;
    scrollAmount = -totalOriginalWidth + itemWidth;
  }
  track.style.transform = `translateX(${scrollAmount}px)`;
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("img01");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const closeLightbox = document.querySelector(".close-lightbox");

// Delegation for click (works for clones too)
track.addEventListener("click", (e) => {
  const item = e.target.closest(".portfolio-item");
  if (!item) return;

  const img = item.querySelector("img");
  const title = item.querySelector(".item-overlay span").innerText;
  const desc = item.querySelector(".item-overlay p").innerText;

  lightbox.style.display = "flex";
  lightboxImg.src = img.src;
  modalTitle.innerText = title;
  modalDesc.innerText = desc;
  document.body.style.overflow = "hidden";
});

closeLightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
  document.body.style.overflow = "auto";
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
