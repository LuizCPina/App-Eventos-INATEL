const header = document.querySelector('.landing-header');
const reveals = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('[data-counter]');

function applyHeaderState() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 24);
}

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  reveals.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < windowHeight - 90) {
      element.classList.add('visible');
    }
  });
}

function animateCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter || 0);
    const duration = 1000;
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      counter.textContent = Math.floor(progress * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(step);
  });
}

window.addEventListener('scroll', () => {
  applyHeaderState();
  revealOnScroll();
});

window.addEventListener('load', () => {
  applyHeaderState();
  revealOnScroll();
  animateCounters();
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
