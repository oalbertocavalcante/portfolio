import { prefersReducedMotion } from './motion';

const INTRO_DELAY = 1500;
const STEP_DURATION = 500;
const EXIT_DURATION = 600;
const FALLBACK_DELAY = 4000;

const preloader = document.querySelector<HTMLElement>('[data-preloader]');
let started = false;

const wait = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

function finish(): void {
  preloader?.remove();
  document.documentElement.classList.add('is-loaded');
  window.dispatchEvent(new CustomEvent('preloader:done'));
}

async function play(element: HTMLElement): Promise<void> {
  const curve = element.querySelector<SVGAnimationElement>('[data-preloader-curve]');
  const flat = element.querySelector<SVGAnimationElement>('[data-preloader-flat]');

  await wait(INTRO_DELAY);
  element.classList.add('is-leaving');
  await wait(STEP_DURATION);
  curve?.beginElement();
  await wait(STEP_DURATION);
  flat?.beginElement();
  await wait(STEP_DURATION);
  element.classList.add('is-done');
  await wait(EXIT_DURATION);
  finish();
}

function start(): void {
  if (started || !preloader) return;
  started = true;
  void play(preloader);
}

if (!preloader || prefersReducedMotion()) {
  finish();
} else if (document.readyState === 'complete') {
  start();
} else {
  window.addEventListener('load', start, { once: true });
  window.setTimeout(start, FALLBACK_DELAY);
}
