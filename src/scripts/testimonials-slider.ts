import 'swiper/css';
import 'swiper/css/a11y';
import Swiper from 'swiper';
import { A11y, Autoplay, Keyboard, Pagination } from 'swiper/modules';
import { prefersReducedMotion } from './motion';

const AUTOPLAY_DELAY = 3000;
const SLIDE_SPEED = 1000;

document.querySelectorAll<HTMLElement>('[data-testimonials]').forEach((element) => {
  const pagination = element.querySelector<HTMLElement>('[data-testimonials-pagination]');
  const reducedMotion = prefersReducedMotion();

  new Swiper(element, {
    modules: [A11y, Autoplay, Keyboard, Pagination],
    slidesPerView: 1,
    spaceBetween: 30,
    rewind: true,
    speed: reducedMotion ? 0 : SLIDE_SPEED,
    grabCursor: true,
    keyboard: { enabled: true, onlyInViewport: true },
    autoplay: reducedMotion
      ? false
      : { delay: AUTOPLAY_DELAY, disableOnInteraction: false, pauseOnMouseEnter: true },
    pagination: pagination ? { el: pagination, clickable: true } : false,
    a11y: {
      slideLabelMessage: element.dataset.labelSlide ?? '',
      paginationBulletMessage: element.dataset.labelBullet ?? '',
    },
    breakpoints: {
      600: { slidesPerView: 2 },
      992: { slidesPerView: 'auto' },
    },
  });
});
