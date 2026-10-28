export function onPageReady(callback: () => void): void {
  if (document.documentElement.classList.contains('is-loaded')) {
    callback();
    return;
  }
  window.addEventListener('preloader:done', callback, { once: true });
}
