import { onPageReady } from './page-ready';

const outline = document.querySelector<SVGTextElement>('[data-hero-outline]');

if (outline) {
  onPageReady(() => outline.classList.add('is-drawn'));
}
