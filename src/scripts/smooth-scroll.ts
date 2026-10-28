import 'lenis/dist/lenis.css';
import Lenis from 'lenis';
import { prefersReducedMotion } from './motion';
import { onPageReady } from './page-ready';

const ANCHOR_OFFSET = -90;
const root = document.documentElement;

let lenis: Lenis | null = null;

onPageReady(() => {
  if (prefersReducedMotion()) return;
  lenis = new Lenis({ autoRaf: true });
  if (root.classList.contains('is-scroll-locked')) lenis.stop();
});

export function scrollToPosition(target: HTMLElement | number, offset = 0): void {
  if (lenis) {
    lenis.scrollTo(target, { offset });
    return;
  }
  const top =
    typeof target === 'number'
      ? target
      : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

export function setScrollLocked(locked: boolean): void {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  root.classList.toggle('is-scroll-locked', locked);
}

document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[data-scroll-link]');
  if (!link) return;
  const id = decodeURIComponent(link.hash.slice(1));
  const target = id ? document.getElementById(id) : null;
  if (!target) return;

  event.preventDefault();
  window.dispatchEvent(new CustomEvent('anchor:navigate', { detail: { id, link } }));
  scrollToPosition(target, ANCHOR_OFFSET);
  window.history.replaceState(null, '', `#${id}`);
  target.focus({ preventScroll: true });
});
