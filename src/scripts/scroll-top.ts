import { scrollToPosition } from './smooth-scroll';

const VISIBILITY_OFFSET = 50;

const button = document.querySelector<HTMLButtonElement>('[data-scroll-top]');
const path = button?.querySelector<SVGPathElement>('[data-scroll-top-path]');

if (button && path) {
  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length} ${length}`;
  path.style.strokeDashoffset = `${length}`;

  let frame = 0;

  const update = (): void => {
    frame = 0;
    const scrolled = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(scrolled / scrollable, 1) : 0;
    path.style.strokeDashoffset = `${length - progress * length}`;
    button.classList.toggle('is-visible', scrolled >= VISIBILITY_OFFSET);
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    },
    { passive: true },
  );

  button.addEventListener('click', () => {
    scrollToPosition(0);
    document.querySelector<HTMLElement>('[data-site-header] a')?.focus({ preventScroll: true });
  });

  update();
}
