// Navbar shadow
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// Typing Effect
const text = ["Start Your Journey Now"];
let index = 0;
let char = 0;
const typedText = document.getElementById("typed-text");
function typeEffect() {
  if (char < text[index].length) {
    typedText.textContent += text[index].charAt(char);
    char++;
    setTimeout(typeEffect, 90);
  }
}
typeEffect();

// Fade on scroll
const faders = document.querySelectorAll('.fade-in, .fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));

// Scroll spy
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});
