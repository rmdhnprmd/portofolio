function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const lenis = new Lenis();
lenis.on("scroll", (e) => {
  // console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

const scrollButtons = document.querySelectorAll("[data-target]");
scrollButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    let target = button.dataset.target,
      $el = document.getElementById(target.replace("#", ""));

    lenis.scrollTo($el, {
      offset: 0,
      immediate: false,
      duration: 2,
      easing: (x) =>
        x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
    });
  });
});

requestAnimationFrame(raf);

const dynamicText = document.querySelector(".animated-title span");
const words = ["RamSky", "Rama"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    dynamicText.textContent = words[wordIndex].substring(0, charIndex);
    dynamicText.classList.add('stop-blinking')

    if (!isDeleting && charIndex < words[wordIndex].length) {
      charIndex++;
      setTimeout(typeEffect, 150);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 150);
    } else {
      isDeleting = !isDeleting;
      dynamicText.classList.remove('stop-blinking');
      wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
      setTimeout(typeEffect, 1200)
    }
  
};

typeEffect();

const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline");

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // cursorOutline.style.left = `${posX}px`;
  // cursorOutline.style.top = `${posY}px`;

  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`,
  }, { duration: 2000, fill: "forwards"});
})