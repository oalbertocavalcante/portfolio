import { prefersReducedMotion } from './motion';

const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

function reveal(element: Element): void {
  element.classList.add('is-revealed');
}

if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
  elements.forEach(reveal);
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -100px 0px' },
  );
  elements.forEach((element) => observer.observe(element));
}
