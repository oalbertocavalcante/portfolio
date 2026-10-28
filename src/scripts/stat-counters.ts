import { prefersReducedMotion } from './motion';
import { onPageReady } from './page-ready';

const counters = document.querySelectorAll<HTMLElement>('[data-stat-counter]');

function complete(counter: Element): void {
  counter.classList.add('is-counted');
}

if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
  counters.forEach(complete);
} else {
  onPageReady(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          complete(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );
    counters.forEach((counter) => observer.observe(counter));
  });
}
