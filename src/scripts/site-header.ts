import { prefersReducedMotion } from './motion';
import { setScrollLocked } from './smooth-scroll';

const STICKY_OFFSET = 500;
const desktopQuery = window.matchMedia('(min-width: 992px)');

const header = document.querySelector<HTMLElement>('[data-site-header]');
const toggle = header?.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const panel = header?.querySelector<HTMLElement>('[data-mobile-menu]');
const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]');

let isSticky = false;
let isMenuOpen = false;
let frame = 0;

function updateSticky(): void {
  frame = 0;
  if (!header || isMenuOpen) return;
  const shouldStick = window.scrollY > STICKY_OFFSET;
  if (shouldStick === isSticky) return;
  isSticky = shouldStick;

  if (shouldStick) {
    header.classList.remove('is-leaving');
    header.classList.add('is-sticky');
  } else if (prefersReducedMotion()) {
    header.classList.remove('is-sticky');
  } else {
    header.classList.add('is-leaving');
  }
}

function setBackgroundInert(inert: boolean): void {
  Array.from(document.body.children).forEach((element) => {
    if (element === header || element.contains(header)) return;
    if (element instanceof HTMLElement) element.inert = inert;
  });
}

function setMenu(open: boolean, restoreFocus = true): void {
  if (!header || !toggle || !panel || open === isMenuOpen) return;
  isMenuOpen = open;
  header.classList.toggle('is-menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute(
    'aria-label',
    (open ? toggle.dataset.labelClose : toggle.dataset.labelOpen) ?? '',
  );
  panel.inert = !open;
  setBackgroundInert(open);
  setScrollLocked(open);

  if (open) {
    window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => {
        if (isMenuOpen) panel.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
      }),
    );
  } else if (restoreFocus) {
    toggle.focus({ preventScroll: true });
  }
}

function setActiveSection(section: string): void {
  document.documentElement.dataset.activeSection = section;
  navLinks.forEach((link) => {
    const active = link.dataset.targetSection === section;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function observeSections(): void {
  const sections = document.querySelectorAll<HTMLElement>('section[data-section]');
  if (!sections.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const section = (entry.target as HTMLElement).dataset.section;
        if (entry.isIntersecting && section) setActiveSection(section);
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((section) => observer.observe(section));
}

if (header) {
  header.addEventListener('animationend', () => {
    if (header.classList.contains('is-leaving')) {
      header.classList.remove('is-leaving', 'is-sticky');
    }
  });

  window.addEventListener(
    'scroll',
    () => {
      if (!frame) frame = window.requestAnimationFrame(updateSticky);
    },
    { passive: true },
  );

  toggle?.addEventListener('click', () => setMenu(!isMenuOpen));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen) setMenu(false);
  });

  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) setMenu(false, false);
  });

  window.addEventListener('anchor:navigate', () => setMenu(false, false));

  observeSections();
  updateSticky();
}
