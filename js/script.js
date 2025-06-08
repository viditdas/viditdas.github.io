// === Navbar Shadow on Scroll ===
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// === Fade-In on Scroll ===
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

// === Scroll Spy ===
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

// === Three.js + Anime.js Cube Animation ===
window.addEventListener('DOMContentLoaded', () => {
  // === Typing Effect ===
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

  const container = document.querySelector('.cube-background');

  if (!container || typeof THREE === 'undefined' || typeof anime === 'undefined') {
    console.error('❌ Three.js or Anime.js not loaded or .cube-background not found.');
    return;
  }

  console.log('✅ All dependencies loaded');

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    65,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.z = 5;

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });

  function createAnimatedCube() {
    const cube = new THREE.Mesh(geometry, baseMaterial.clone());
    cube.position.set(
      anime.random(-10, 10),
      anime.random(-5, 5),
      anime.random(-10, 10)
    );
    scene.add(cube);

    anime({
      targets: cube.position,
      x: anime.random(-10, 10),
      y: anime.random(-5, 5),
      z: anime.random(-10, 10),
      duration: 6000,
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true
    });

    anime({
      targets: cube.rotation,
      x: anime.random(-Math.PI, Math.PI),
      y: anime.random(-Math.PI, Math.PI),
      z: anime.random(-Math.PI, Math.PI),
      duration: 6000,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true
    });
  }

  for (let i = 0; i < 40; i++) {
    createAnimatedCube();
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
});

