import { gsap } from 'gsap';
import { prefersReducedMotion } from './motion';

const CURVED_PATH = 'M0 502S175 272 500 272s500 230 500 230V0H0Z';
const FLAT_PATH = 'M0 2S175 1 500 1s500 1 500 1V0H0Z';
const FALLBACK_DELAY = 4000;

const preloader = document.querySelector<HTMLElement>('[data-preloader]');
let started = false;

function finish(): void {
  preloader?.remove();
  document.documentElement.classList.add('is-loaded');
  window.dispatchEvent(new CustomEvent('preloader:done'));
}

function start(): void {
  if (started || !preloader) return;
  started = true;

  const path = preloader.querySelector('[data-preloader-path]');
  const text = preloader.querySelector('[data-preloader-text]');

  gsap
    .timeline({ onComplete: finish })
    .to(text, { delay: 1.5, y: -100, opacity: 0 })
    .to(path, { duration: 0.5, attr: { d: CURVED_PATH }, ease: 'power2.in' })
    .to(path, { duration: 0.5, attr: { d: FLAT_PATH }, ease: 'power2.out' })
    .to(preloader, { yPercent: -100, duration: 0.6, ease: 'power2.inOut' });
}

if (!preloader || prefersReducedMotion()) {
  finish();
} else if (document.readyState === 'complete') {
  start();
} else {
  window.addEventListener('load', start, { once: true });
  window.setTimeout(start, FALLBACK_DELAY);
}
